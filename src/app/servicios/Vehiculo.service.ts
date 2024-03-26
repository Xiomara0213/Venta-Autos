import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculo } from '../utilitarios/modelos/Vehiculo';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {


  constructor(
    private http: HttpClient
  ) { }
  baseUrl = "https://epico.gob.ec/vehiculo/public/api";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
  };
        /*
        Todos vehiculos => GET vehiculos/
        Insert => POST vehiculo/
        Update => PUT vehiculo/:codigo
        Delete => DELETE vehiculo/:codigo
        Consulta => GET vehiculo/:codigo
        */

  getVehiculos(): Observable<Respuesta>{
    return this.http.get<Respuesta>(this.baseUrl+"/vehiculos/").pipe(
      map(respuesta => respuesta.data),
    );
  }

  insertVehiculo(vehiculo: Vehiculo){
            /*let body = new HttpParams();
            body = vehiculo.codigo ? body.set('codigo', vehiculo.codigo) : body;
            body = vehiculo.marca ? body.set('marca', vehiculo.marca) : body;
            body = vehiculo.modelo ? body.set('modelo', vehiculo.modelo) : body;
            body = vehiculo.anio ? body.set('anio', vehiculo.anio) : body;
            body = vehiculo.color ? body.set('color', vehiculo.color) : body;
            body = vehiculo.kilometraje ? body.set('kilometraje', vehiculo.kilometraje) : body;
            body = vehiculo.precio ? body.set('precio', vehiculo.precio) : body;
            body = vehiculo.calificacion ? body.set('calificacion', vehiculo.calificacion) : body;*/
    return this.http.post<Respuesta>(this.baseUrl+"vehiculo/", vehiculo);
  }
 
  getVehiculo(codigo:string){
    return this.http.get<Respuesta>(this.baseUrl+"vehiculo/"+codigo);
  }

  actualizarVehiculo(vehiculo: Vehiculo, codigo:string){
    return this.http.put<Respuesta>(this.baseUrl+"vehiculo/"+codigo, vehiculo, this.httpOptions);
  }

  eliminarVehiculo(codigo:string){
    return this.http.delete<Respuesta>(this.baseUrl+"vehiculo/"+codigo);
  }
  /*getVehiculo(codigo:string): Observable<Vehiculo>{
    const escucha: Observable<Vehiculo> = new Observable(escuchando => {
      setTimeout(()=>{
        let vehiculo = this.listaVehiculos.find(ele => ele.codigo === codigo);
        escuchando.next(vehiculo); //next; error; complete
      }, 400);
    });
    return escucha;
  }*/
  
  addVehiculo(vehiculo: Vehiculo){
    this.listaVehiculos.push(vehiculo);
  }
  
  public listaVehiculos: Array<Vehiculo> = [
    {"codigo":"A0001", "marca":"CHEVROLET", "modelo":"ONIX-6", "color":"AZUL", "kilometraje":"50000", "precio":17000, "foto":"https://www.chevrolet.com.ec/content/dam/chevrolet/south-america/ecuador/espanol/index/cars/2021-onix-sedan/mov/10-images/onix-turbo-sedan.png?imwidth=420", "anio":2024, "calificacion":3}, 
    {"codigo":"A0002", "marca":"KIA", "modelo":"RIO-2", "color":"AZUL", "kilometraje":"50000", "precio":17000, "foto":"https://www.kia.com/content/dam/kwcms/ec/es/images/SHOWROOM2021/Rio5/features/rio5_side.png","anio":2024,"calificacion":4}, 
    {"codigo":"A0003", "marca":"CHERY", "modelo":"ARRIZO-5", "color":"AZUL", "kilometraje":"50000", "precio":17000, "foto":"https://www.chery.com.ec/hs-fs/hubfs/CHERY/WEB%202023/Arrizo%205%20Pro/Arrizo-5-pro_webp.webp?width=1920&height=714&name=Arrizo-5-pro_webp.webp","anio":2024,"calificacion":4}, 
    {"codigo":"A0004", "marca":"TOYOTA", "modelo":"AGYA", "color":"AZUL", "kilometraje":"50000", "precio":17000, "foto":"https://www.toyota.com.ec//admin/sites/default/files/2023-08/toyota-agya-color-rojo.png","anio":2024,"calificacion":5},
    {"codigo":"A0005", "marca":"HYUNDAI", "modelo":"ACCENT", "color":"AZUL", "kilometraje":"50000", "precio":17000, "foto":"https://www.hyundai.com.ec/static/media/rendimiento3.65a2ca8575719cfabb7c.webp","anio":2024,"calificacion":5},
  ];

  /*getVehiculos(): Vehiculo[]{
    return this.listaVehiculos;
  }*/

}

export interface Respuesta {
  codigo: string;
  mensaje: string;
  data:Array<Vehiculo>|Vehiculo|any;
}
