import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from '../utilitarios/modelos/Cliente';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private http: HttpClient
  ) { }

  baseUrl = "https://epico.gob.ec/vehiculo/public/api/";

  /*httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };*/

  /*obtenerClientes(): Observable<cliente> {
    return this.http.get<cliente>(this.baseUrl+"/clientes/").pipe(
      map(cliente => cliente.data),
    );
  }*/

  crearCliente(cliente:any) {
    return this.http.post(this.baseUrl+"cliente/",  cliente);
  }

  /*actualizarCliente(id: string, cliente: string): Observable<cliente> {
    return this.http.put<cliente>(`${this.baseUrl+"/clientes/"}/${id}`, cliente);
  }*/

  /*eliminarCliente(id: string): Observable<cliente> {
    return this.http.delete<cliente>(`${this.baseUrl+"/clientes/"}/${id}`);
  }*/

}

export interface cliente {
  id: string;
  mensaje: string;
  data:Array<Cliente>|Cliente|any;
}
