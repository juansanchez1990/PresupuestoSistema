import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { observable, Observable } from 'rxjs';
import { RegistroServiceService } from 'src/app/services/registro-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-presupuestos',
  templateUrl: './list-presupuestos.component.html',
  styleUrls: ['./list-presupuestos.component.css']
})
export class ListPresupuestosComponent implements OnInit {

  constructor(public Registro: RegistroServiceService) { }
  PresupuestosList: any = [];
  PresupuestosEditar: any = [];
  ListCategorias: any = [];
  RegistroEditar: FormGroup;
  TrasladoMonto: FormGroup;
  modal = false;
  FechaDesde: Date = new Date();
  FechaHasta: Date = new Date();
  LimiteMonto: any;
  IdPresupuesto: number;
  idPresupuestoSumar: number;
  idPresupuestoRestar: number;
  MontoAcumulado: any;
  MontoActual: any;
monto = new FormControl('')

  Presupuesto:any;

  ngOnInit() {
    this.Registro.getPresupuestos().subscribe(data => {
      this.PresupuestosList = data;
      console.log('Categories', this.PresupuestosList)
    })

   

    this.modal = false

    this.RegistroEditar = new FormGroup({

      Limite: new FormControl(''),
      Desde: new FormControl(''),
      Hasta: new FormControl(''),


    });

    this.TrasladoMonto = new FormGroup({

      Monto: this.monto

    }, { validators: this.SiMontoEsMayor() });

    

    this.ListaCategorias();
  }
  CapturarPresupuesto(presupuestoId){
    console.log('idASumar', presupuestoId)
    this.IdPresupuesto = presupuestoId
    this.idPresupuestoSumar = presupuestoId;
    }
  ListaCategorias(){
    this.Registro.getCategoriasPresupuestos().subscribe((data:any)=>{
   
      this.ListCategorias = data;
     
      
    })
  }



  TrasladarMonto( Monto){

    try{

      this.Registro.trasladarPresupuesto(this.idPresupuestoSumar,this.idPresupuestoRestar,Monto).subscribe(data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se registró el traslado satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.Registro.getPresupuestos().subscribe(data => {
          this.PresupuestosList = data;
          console.log('Categories', this.PresupuestosList)
        })
    

      }, error => {
        
console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${error.error.Message}`,
          showConfirmButton: true,
          timer: 6000
        })
      })
    }
   catch{

   }


  }

  
  
  mandarPresupuesto(presupuesto) {
     this.idPresupuestoRestar= presupuesto.header.id
     this.Registro.getMontoActualPorID(presupuesto.header.id).subscribe(data=>{
       this.MontoAcumulado = data;
       if(this.MontoAcumulado ==null){
         this.MontoAcumulado =0;
         

        }
        this.MontoActual = this.LimiteMonto - this.MontoAcumulado;
     
     })
    this.FechaDesde = new Date(presupuesto.header.Desde)
    this.LimiteMonto = presupuesto.header.Limite
    this.FechaHasta = new Date(presupuesto.header.Hasta)
    this.modal = true;

    this.PresupuestosEditar = presupuesto

    this.Presupuesto = presupuesto
   
  }


  SiMontoEsMayor(): ValidatorFn {
    
    
    return (control: AbstractControl): ValidationErrors | null => {
  const MontoTrasladar = this.monto.value
  const MontoActual = this.MontoActual;

  return MontoTrasladar> MontoActual ? { MontoMayor: true } : null;
};

}
    
  actualizarPresupuesto(id, registroEditar, idCategoria) {
  

    let PresupuestoAEditar = {
      id: id,
      Limite: registroEditar.Limite,
      Id_Categoria_Presupuesto: idCategoria,
      Desde: registroEditar.Desde,
      Hasta: registroEditar.Hasta,
      MontoDisponible: registroEditar.Limite -  this.MontoAcumulado
    }



    this.Registro.ActualizarPresupuesto(id, PresupuestoAEditar).subscribe(data => {
      this.Registro.getPresupuestos().subscribe(data => {
        this.PresupuestosList = data;
        console.log('Categories', this.PresupuestosList)
      })
  
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se actualizó el presupuesto',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }



  DeletePresupuesto(id: number) {

    Swal.fire({
      title: '¿Desea eliminar este presupuesto?',
      showDenyButton: true,

      confirmButtonText: `Eliminar`,
      denyButtonText: `No eliminar`,
    }).then((result) => {

      if (result.isConfirmed) {

        this.Registro.DeletePresupuesto(id).subscribe(data => {


          this.Registro.getPresupuestos().subscribe(data => {
            this.PresupuestosList = data;
          })

        })
        Swal.fire('Eliminado!', '', 'success')
      }
    })


  }

}
