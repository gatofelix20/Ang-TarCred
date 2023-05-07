import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TarjetaCredito } from '../models/TarjetaCredito';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

   private tarjeta = new Subject<any>();

  constructor( private firebase: AngularFirestore) { }

  //servicio

 guardarTarjeta(tarjeta: TarjetaCredito)
 : Promise<any> {
   return this.firebase.collection('tarjeta').add(tarjeta);
 }

  obtenerTarjeta(): Observable<any> {

  return this.firebase.collection('tarjeta', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();

 }

 eliminarTarjeta(id:string): Promise<any> {

  return this.firebase.collection('tarjeta').doc(id).delete();

 }

 editarTarjeta(id: string, tarjeta: any): Promise<any> {

   return this.firebase.collection('tarjeta').doc(id).update(tarjeta);

 }

 addTarjetaEdit(tarjeta: TarjetaCredito) {

   this.tarjeta.next(tarjeta);

 } 

 getTarjetaEdit(): Observable<TarjetaCredito> {

  return this.tarjeta.asObservable();

 }

}
