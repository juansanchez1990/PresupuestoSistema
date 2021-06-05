import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroServiceService } from 'src/app/services/registro-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-influencer',
  templateUrl: './add-influencer.component.html',
  styleUrls: ['./add-influencer.component.css']
})
export class AddInfluencerComponent implements OnInit {
  addInfluencer: FormGroup;
  Nombre = new FormControl('', [Validators.minLength(2), Validators.required]);
  NombreComercial = new FormControl('', [Validators.minLength(2), Validators.required]);
  Observaciones = new FormControl('');
  constructor(private Registro: RegistroServiceService) { }

  ngOnInit() {
  this.addInfluencer = new FormGroup({
    Nombre:this.Nombre,
    NombreComercial: this.NombreComercial,
    Observaciones: this.Observaciones
  })
  }

  SaveInfluencer(influencer){
   let AddInfluencer={
     idCategoria : 11,
     Nombre: influencer.Nombre,
     NombreComercial: influencer.NombreComercial,
     Observaciones: influencer.Observaciones
   }

 this.Registro.SaveInfluencer(AddInfluencer).subscribe(data=>{
   this.Registro.getListInfluencer();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Se registró al influencer satisfactoriamente',
    showConfirmButton: false,
    timer: 1500
  })
 });
  }

 

}
