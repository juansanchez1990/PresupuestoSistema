import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { RegistroServiceService } from 'src/app/services/registro-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registros-pagos-radios',
  templateUrl: './registros-pagos-radios.component.html',
  styleUrls: ['./registros-pagos-radios.component.css']
})
export class RegistrosPagosRadiosComponent implements OnInit {

  @Input() idCateg: number;
  ListConceptos = [];
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
    this.RegistroI.getConcepto_PresupuestoPorId(1).subscribe((data: any) => {
      this.ListConceptos = data;
      console.log('Conceptos',this.ListConceptos)
     
    })
  }

  getMontoActual() {
    this.RegistroI.getMontoActual(1).subscribe(data => {
      console.log('MontAct', data)
      if (data === null) {
        data = 0;
      }
      this.montoActual = data;
      console.log('Monto Actual', data)
      this.montoActualPercent = ((this.montoActual / this.MontoLimitePresupuesto) * 100).toFixed(0);
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
          Id_Presupuesto_Header: 1,
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
            title: `${error.error.Message}`,
            showConfirmButton: true,
           
          })
        })


        this.RegistroInf.reset();

      }
      catch (exception) {

      }
    }




  }
}
