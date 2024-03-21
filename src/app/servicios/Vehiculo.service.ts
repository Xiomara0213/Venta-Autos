import { HttpClient, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculo } from '../utilitarios/modelos/Vehiculo';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(
    //private http: HttpClient
  ) { }
  //baseUrl = "http://www.epico.gob.ec/vehiculo/public/api/";

  /*getVehiculos(filtro?:string, rows?:number, page?:number):Observable<Vehiculo[]>{
    let body = new HttpParams();
    body = filtro ? body.set('filtro', filtro) : body;
    body = rows ? body.set('rows', rows) : body;
    body = page ? body.set('page', page) : body;
    return this.http.get<Respuesta>(this.baseUrl+"vehiculos/",{params:body}).pipe(
      map(respuesta => respuesta.data),
      //catchError(this.handleError)
    );
  }*/
  
  getVehiculos(filtro: any):Observable<Array<Vehiculo>>{
    const escucha: Observable<Array<Vehiculo>> = new Observable(escuchando => {
      let lista = this.listaVehiculos.filter( elem => elem.marca.toLocaleLowerCase().includes(filtro.toLowerCase()))
      escuchando.next(lista);
    });
    return escucha;
  }

  getVehiculo(codigo:string): Observable<Vehiculo | undefined>{
    const escucha: Observable<Vehiculo | undefined> = new Observable(escuchando => {
      setTimeout(()=>{
        let vehiculo = this.listaVehiculos.find(ele => ele.codigo === codigo);
        escuchando.next(vehiculo); //next; error; complete
      }, 1000);
    });
    return escucha;
  }

  addVehiculo(vehiculo: Vehiculo){
    this.listaVehiculos.push(vehiculo);
  }
  
  private listaVehiculos: Array<Vehiculo> = [
    {"codigo":"A001", "marca":"CHEVROLET", "modelo":"ONIX-6", "color":"AZUL", "kilometraje":"50000", "precio":17000, "foto":"https://www.chevrolet.com.ec/content/dam/chevrolet/south-america/ecuador/espanol/index/cars/2021-onix-sedan/mov/10-images/onix-turbo-sedan.png?imwidth=420", "anio":2024, "calificacion":3}, 
    {"codigo":"A002", "marca":"KIA", "modelo":"RIO-2", "color":"AZUL", "kilometraje":"50000", "precio":17000, "foto":"https://www.kia.com/content/dam/kwcms/ec/es/images/SHOWROOM2021/Rio5/features/rio5_side.png","anio":2024,"calificacion":4}, 
    {"codigo":"A003", "marca":"CHERY", "modelo":"ARRIZO-5", "color":"AZUL", "kilometraje":"50000", "precio":17000, "foto":"https://www.chery.com.ec/hs-fs/hubfs/CHERY/WEB%202023/Arrizo%205%20Pro/Arrizo-5-pro_webp.webp?width=1920&height=714&name=Arrizo-5-pro_webp.webp","anio":2024,"calificacion":4}, 
    {"codigo":"A004", "marca":"TOYOTA", "modelo":"AGYA", "color":"AZUL", "kilometraje":"50000", "precio":17000, "foto":"https://www.toyota.com.ec//admin/sites/default/files/2023-08/toyota-agya-color-rojo.png","anio":2024,"calificacion":5},
    {"codigo":"A005", "marca":"HYUNDAI", "modelo":"ACCENT", "color":"AZUL", "kilometraje":"50000", "precio":17000, "foto":"https://www.hyundai.com.ec/static/media/rendimiento3.65a2ca8575719cfabb7c.webp","anio":2024,"calificacion":5},
  ];
  
}
