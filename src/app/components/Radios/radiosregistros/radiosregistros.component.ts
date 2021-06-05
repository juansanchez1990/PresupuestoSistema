import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import Swal from 'sweetalert2'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { concatMapTo } from 'rxjs/operators';
import { RegistroServiceService } from 'src/app/services/registro-service.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-radiosregistros',
  templateUrl: './radiosregistros.component.html',
  styleUrls: ['./radiosregistros.component.css']
})
export class RadiosregistrosComponent implements OnInit {
  ListInfluencer = [];
  montoActual: any = 0;
  montoActualPercent: any;


  NombreInf: any;
  NombreC: any;
  Observ: any;
 

  Nombre = new FormControl('', [Validators.minLength(2), Validators.required]);
  MontoaPagar = new FormControl('', [Validators.minLength(2), Validators.required]);
  TipoPago = new FormControl('', [Validators.minLength(2), Validators.required]);
  FechaPago = new FormControl('', [Validators.minLength(2), Validators.required]);
  Usuario = new FormControl('')
  Observaciones = new FormControl('')
  RegistroInf: FormGroup;

  InfluencerEditarPago: FormGroup;
  EditarInfluencer: FormGroup;
  modal = false;
  FechaPagoInfluencer: Date = new Date();
  LimiteMonto: any;

  displayedColumns: string[] = ['Nombre', 'Fecha de Pago', 'Tipo de Pago', 'Monto Pagado', 'id', 'Editar', 'Eliminar'];
  @ViewChild(MatSort) sort: MatSort;
  constructor(private RegistroI: RegistroServiceService, private LoginS: LoginService) { }
  public user: any;
  ModalInf= false;
  dataSource
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  PagadoFecha: Date = new Date();
  NombreDelInfluencer: any
  MontoYaPagado: any;
  PagoTipo: any;
  id: any;
  idInfluencer: any;
  MontoLimitePresupuesto: any;


  ngOnInit() {
    this.LoginS.userData$.subscribe(data => {
      this.user = data;
    })
    this.RegistroI.getMontoPresupuestoPorID(1).subscribe(data=>{
      this.MontoLimitePresupuesto = data;
   console.log('MontoPresupesto', data)
    })
    this.RegistroInf = new FormGroup({
      Nombre: this.Nombre,
      MontoaPagar: this.MontoaPagar,
      Fecha: this.FechaPago,

      TipoPago: this.TipoPago,
      Observaciones: this.Observaciones

    });

    this.getRegistros();
    this.RegistrosGet();
   this.getMontoActual() ;


    this.InfluencerEditarPago = new FormGroup({

      MontoPagado: new FormControl(''),
      FechaPagoInfluencer: new FormControl(''),
      TipodePago: new FormControl(''),
      NombreInfluencer: new FormControl(''),



    });

    this.EditarInfluencer = new FormGroup({

      Nombre: new FormControl(''),
      NombreComercial: new FormControl(''),
      Observaciones: new FormControl(''),
      



    });

  }

  EditInfluencer( influencer){
    
    let EditInfluencer={
      id : this.idInfluencer,
      Nombre: influencer.Nombre,
      NombreComercial: influencer.NombreComercial,
      Observaciones: influencer.Observaciones,
      idCategoria: 11
    }
 this.RegistroI.EditInfluencer(this.idInfluencer, EditInfluencer).subscribe(data=>{
   this. RegistrosGet(); 
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Se guardaron los cambios',
    showConfirmButton: false,
    timer: 1500
  })
 });
  }

  DeleteInfluencer(id: number) {

    Swal.fire({
      title: '¿Desea eliminar este registro?',
      showDenyButton: true,

      confirmButtonText: `Eliminar`,
      denyButtonText: `No eliminar`,
    }).then((result) => {

      if (result.isConfirmed) {

        this.RegistroI.DeleteInfluencer(id).subscribe(data => {


          this.RegistrosGet();
       

        })
        Swal.fire('Eliminado!', '', 'success')
      }
    })


  }

  getDatosPago(pago) {

    this.MontoYaPagado = pago.Monto
    this.NombreDelInfluencer = pago.Descripcion
    this.PagadoFecha = new Date(pago.Fecha)
    this.PagoTipo = pago.TipoPago,
      this.id = pago.id


    this.modal = true;
  }

  actualizarPago(pago) {

    let PagoAEditar = {

      Descripcion: pago.NombreInfluencer,
      Monto: pago.MontoPagado,
      Fecha: pago.FechaPagoInfluencer,
      TipoPago: pago.TipodePago,
      id: this.id


    }


    this.RegistroI.ActualizarPagoInfluencer(this.id, PagoAEditar).subscribe(data => {

      this.getRegistros();
      this.getMontoActual();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se guardaron los cambios',
        showConfirmButton: false,
        timer: 1500
      })
    });

  }

  DeletePago(id: number) {

    Swal.fire({
      title: '¿Desea eliminar este presupuesto?',
      showDenyButton: true,

      confirmButtonText: `Eliminar`,
      denyButtonText: `No eliminar`,
    }).then((result) => {

      if (result.isConfirmed) {

        this.RegistroI.DeletePagoInfluencer(id).subscribe(data => {


          this.getRegistros();
          this.getMontoActual();

        })
        Swal.fire('Eliminado!', '', 'success')
      }
    })


  }


  getRegistros() {
    this.RegistroI.getDetallesPago(1).subscribe(data => {
      console.log('DetallesPagos', data)
      this.dataSource = new MatTableDataSource(<any>data)
      this.dataSource.sort = this.sort



    })
  }



  RegistrosGet() {
    this.RegistroI.getListInfluencer().subscribe((data: any) => {
      this.ListInfluencer = data;
     
    })
  }


  SetInfluencer(dataInfluencer) {
    this.NombreInf= dataInfluencer.Nombre;
  this.NombreC= dataInfluencer.NombreComercial;
  this.Observ= dataInfluencer.Observaciones;
  this.idInfluencer= dataInfluencer.id;
  this.ModalInf = true
   
  }
  getMontoActual() {
    this.RegistroI.getMontoActual(1).subscribe(data => {
      if (data === null) {
        data = 0;
      }
      this.montoActual = data;
      console.log('Monto actual', this.montoActual)

      this.montoActualPercent = ((this.montoActual / this.MontoLimitePresupuesto) * 100).toFixed(1);
      console.log('Monto percent', this.montoActualPercent)
    })
  }


}
