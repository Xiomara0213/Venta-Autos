import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginaModule } from './paginas/PaginaModule';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UsuariointerceptorService } from './interceptores/usuariointerceptor.service';

@NgModule({
  declarations: [		
    AppComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginaModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule   
  ],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: UsuariointerceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
