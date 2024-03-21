import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-PgClientesReg',
  templateUrl: './PgClientesReg.component.html',
  styleUrls: ['./PgClientesReg.component.css']
})
export class PgClientesRegComponent implements OnInit {

  clienteForm: FormGroup;
  quiereContacto = false;
  tituloPagina = "Registro del Cliente";

  constructor(
    private fb: FormBuilder,
    private _router:Router
  ){
    this.clienteForm = this.fb.group({
      nombre: [''],
      password: [''],
      email: [''],
      telefono: ['']
    });
  }

  ngOnInit (): void { 
  }

  toggleContacto(): void {
    this.quiereContacto = !this.quiereContacto;
  }
  guardar():void {
    alert("Cargando");
    //this._router.navigate(['/vehiculos']);
  }

  goInicio():void {
    this._router.navigate(['/home']);
  }

}
