import { Component, OnInit } from '@angular/core';
import { RegistroServiceService } from 'src/app/services/registro-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  showFiller = false;
  ListCategorias=[];
  IdPresupuesto: number;
  RegistroPresupuesto: FormGroup;
  Monto = new FormControl('', [Validators.minLength(2), Validators.required]);
  FechaInicio = new FormControl('', [Validators.minLength(2), Validators.required]);
  FechaFinal = new FormControl('', [Validators.minLength(2), Validators.required]);
  Usuario = new FormControl('');
  NombrePresupuesto = new FormControl('');


  constructor(private RegistroI: RegistroServiceService, private LoginS: LoginService) { }
  public user: any;
  ngOnInit() {

    this.LoginS.userData$.subscribe(data=>{
      this.user = data;
    })
    this.ListaCategorias();
    

    this.RegistroPresupuesto = new FormGroup({
     
      Monto : new FormControl('', [Validators.minLength(2), Validators.required]),
      FechaInicio : new FormControl('', [Validators.minLength(2), Validators.required]),
      FechaFinal : new FormControl('', [Validators.minLength(2), Validators.required]),
      Usuario : new FormControl(''),
     
    
    });


  }
CapturarPresupuesto(presupuestoId){
this.IdPresupuesto = presupuestoId
}
GuardarPresupuesto(Registro){



  if (this.RegistroPresupuesto.valid) {
    try{

  let Info= {
    Monto: Registro.Monto,
    FechaInicio: Registro.FechaInicio,
    FechaFinal: Registro.FechaFinal,
    Id_Categoria_Presupuesto: this.IdPresupuesto
    
   }
 
    
     this.RegistroI.SendRegistroPresupuesto(Info).subscribe(data=>{
      
     }, error=>{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `${error.error.Message}`,
        showConfirmButton: true,
        timer: 6000
      })
     })
     Swal.fire({
       position: 'center',
       icon: 'success',
       title: 'Se registró el presupuesto satisfactoriamente',
       showConfirmButton: false,
       timer: 1500
     })
 
this.RegistroPresupuesto.reset();

    }
catch(exception){
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Ya hay un monto asignado a este presupuesto',
    showConfirmButton: false,
    timer: 1500
  })
}
}
else {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Por favor llene todos los campos',
    showConfirmButton: false,
    timer: 1500
  })

}

}


  ListaCategorias(){
    this.RegistroI.getCategoriasPresupuestos().subscribe((data:any)=>{
   
      this.ListCategorias = data;
      console.log(this.ListCategorias)
    })
  }

}
