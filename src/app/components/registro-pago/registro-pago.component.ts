import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { RegistroServiceService } from 'src/app/services/registro-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro-pago',
  templateUrl: './registro-pago.component.html',
  styleUrls: ['./registro-pago.component.css']
})
export class RegistroPagoComponent implements OnInit {
@Input() idCateg: number;
  ListInfluencer = [];
  Nombre = new FormControl('', [Validators.minLength(2), Validators.required]);
  MontoaPagar = new FormControl('', [Validators.minLength(2), Validators.required]);
  TipoPago = new FormControl('', [Validators.minLength(2), Validators.required]);
  FechaPago = new FormControl('', [Validators.minLength(2), Validators.required]);
  Usuario = new FormControl('')
  Observaciones = new FormControl('')
  montoActual: any = 0;
  montoActualPercent: any;
  MontoLimitePresupuesto: any;
  IdPresupuesto: any;
  NombreSeleccionado: string = '';
  RegistroInf: FormGroup;
  public user: any;
  constructor(private RegistroI: RegistroServiceService, private LoginS: LoginService) { }

  ngOnInit() {

    this.RegistroI.getMontoPresupuestoPorID(11).subscribe(data=>{
      this.MontoLimitePresupuesto = data;
   console.log('MontoPresupesto', data)
    })
    this.RegistrosGet();
   this.getMontoActual() 
    this.LoginS.userData$.subscribe(data => {
      this.user = data;
    })
    this.RegistroInf = new FormGroup({
      Nombre: this.Nombre,
      MontoaPagar: this.MontoaPagar,
      Fecha: this.FechaPago,

      TipoPago: this.TipoPago,
      Observaciones: this.Observaciones

    });


  }
  RegistrosGet() {
    this.RegistroI.getListInfluencer().subscribe((data: any) => {
      this.ListInfluencer = data;
      console.log(this.ListInfluencer)
     
    })
  }

  getMontoActual() {
    this.RegistroI.getMontoActual(11).subscribe(data => {
      if (data === null) {
        data = 0;
      }
      this.montoActual = data;
      console.log('Monto Actual', data)
      this.montoActualPercent = ((this.montoActual / 460040) * 100).toFixed(0);
    })
  }
getIdPresupuesto(id){

   this.IdPresupuesto = id,
 

 
  console.log('IdPResupuesto',id)
}


  async onSaveForm(Registro) {


    if (this.RegistroInf.valid) {
      try {
        let Info = {
          Descripcion: Registro.Nombre,
          Monto: Registro.MontoaPagar,
          Fecha: Registro.Fecha,
          Usuario: this.user.Nombre,
          Id_Presupuesto_Header: 11,
          TipoPago: Registro.TipoPago,
          Observaciones: Registro.Observaciones,

        }
        console.log(Info)
        this.RegistroI.SendRegistroPago(Info).subscribe(data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se registró el pago satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          })
         
          this.getMontoActual();

        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ya supero el limite del presupuesto',
            showConfirmButton: true,
            timer: 6000
          })
        })


        this.RegistroInf.reset();

      }
      catch (exception) {

      }
    }




  }

}
