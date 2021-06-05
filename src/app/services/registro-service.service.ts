import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, observable } from 'rxjs'
import { RegistroInfluencer } from '../components/Interfaces/registro.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RegistroServiceService {
private AppUrl= 'https://localhost:44393/api/Presupuesto';
// private AppUrlInsert= 'http://192.168.68.107/app.publish/Presupuesto/InsertDetalle';
private AppUrlInsert= 'https://localhost:44393/api/Presupuesto/InsertDetalle';
private ApiSumaMonto='https://localhost:44393/api/Presupuesto/GetDetallesSuma';
private GetDetallesPagos = 'https://localhost:44393/api/Presupuesto/GetDetalles';
private CategoriasPresupuestos = 'https://localhost:44393/api/Presupuesto/GetCategoriasPresupuestos';
private InsertNuevoPresupuesto = 'https://localhost:44393/api/Presupuesto/InsertPresupuesto';
private GetPresupuestos = 'https://localhost:44393/api/Presupuesto/GetPresupuestosDetalles';
private PresupuestoDelete = 'https://localhost:44393/api/Presupuesto/DeletePresupuesto';
private PutPresupuesto = 'https://localhost:44393/api/Presupuesto/PutPresupuesto';
private PutInfluencer = 'https://localhost:44393/api/Presupuesto/PutPagoInfluencer';
private DeletePago = 'https://localhost:44393/api/Presupuesto/DeletePago';
private AddInfluencer= 'https://localhost:44393/api/Presupuesto/InsertInfluencer';
private EditarInfluencer= 'https://localhost:44393/api/Presupuesto/PutConcepto';
InfluencerList = new BehaviorSubject([]);
EditarPresupuesto = new BehaviorSubject([]);
CategoriaPresupuestos = new BehaviorSubject([]);
public Selected = {
  
}
  constructor(private afs: AngularFirestore, private http: HttpClient) { 

  
   
    this.getCategoriasPresupuestos();
    this.getPresupuestos();
  
  }


getCategoriasPresupuestos(){
 return this.http.get(this.CategoriasPresupuestos);
}

getConcepto_PresupuestoPorId(id){
  return this.http.get(this.AppUrl+'/'+'Concepto_PresupuestoPorId'+'/'+id,id)
}


SaveInfluencer(influencer): Observable<any>  {

  return this.http.post(this.AddInfluencer,influencer); 

}
EditInfluencer( id, influencer): Observable<any>  {
  console.log('Influencer', id, influencer)
  return this.http.put(this.EditarInfluencer+'/'+id,influencer); 

}
DeleteInfluencer( id): Observable<any>  {
  return this.http.delete(this.AppUrl+'/'+'DeleteInfluencer'+'/'+id); 

}

trasladarPresupuesto(idSuma,idResta,monto){
  console.log('Datos a trasladar', idSuma. idResta,monto)
return this.http.put(this.AppUrl+'/'+'ActualizarMontos'+'/'+idSuma+'/'+idResta+'/'+monto, monto)
}
getMontoActualPorID(id){
  return this.http.get(this.AppUrl+'/'+'GetDetallesSumaporId'+'/'+id,id)
}
ActualizarPresupuesto(id, presupuesto): Observable<any>{
  return this.http.put(this.PutPresupuesto+'/'+id, presupuesto)

}

getIdPresupuestoPorID(id){
  return this.http.get(this.AppUrl+'/'+'EnviarPresupuestoPorID'+'/'+id, id)
}



getPresupuestos(){
  return this.http.get(this.GetPresupuestos);
 }
getMontoActual(id): Observable<any> {
  return this.http.get(this.AppUrl+'/'+'GetDetallesSumaporId'+'/'+id,id)
}
  getListInfluencer(){
    return this.http.get(this.AppUrl)
  }
  SendRegistroPago(Detalle): Observable<any>  {

   return this.http.post(this.AppUrlInsert,Detalle );


 }

 SendRegistroPresupuesto(NuevoPresupuesto): Observable<any>  {
  
  return this.http.post(this.InsertNuevoPresupuesto,NuevoPresupuesto )

}

getDetallesPago(id){
  return this.http.get(this.AppUrl+'/'+'GetDetallesPorID'+'/'+id,id)

}



 
RecibirPresupuesto(presupuesto){
this.EditarPresupuesto = presupuesto;
}


getMontoPresupuestoPorID(id){
  return this.http.get(this.AppUrl+'/'+'GetPresupuestoSumaporId'+'/'+id,id)
}

ActualizarPagoInfluencer(id, pagoInfluncer): Observable<any>{
  return this.http.put(this.PutInfluencer+'/'+id, pagoInfluncer)

}

DeletePresupuesto(id): Observable<any>{
return this.http.delete(this.PresupuestoDelete+'/'+id);

}
DeletePagoInfluencer(id): Observable<any>{
return this.http.delete(this.DeletePago+'/'+id);

}
}
