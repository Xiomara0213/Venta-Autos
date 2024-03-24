import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from '../utilitarios/modelos/Cliente';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private http: HttpClient
  ) { }

  baseUrl = "https://epico.gob.ec/vehiculo/#/Cliente/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  obtenerClientes(): Observable<cliente[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  crearCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, cliente);
  }

  actualizarCliente(id: string, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, cliente);
  }

  eliminarCliente(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

}

export interface cliente {
  codigo: string;
  mensaje: string;
  data:Array<Cliente>|Cliente|any;
}
