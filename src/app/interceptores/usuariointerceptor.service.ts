import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UsuariointerceptorService implements HttpInterceptor {

  usuario:string = "alexandra.montaño";
  clave:string ="usuario-request";

  constructor() { }
  intercept ( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    let clonar = req.clone({
      headers: req.headers.append('key', 'valor')
    });
    return next.handle(clonar);
  }
}
