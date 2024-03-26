import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/Cliente.service';
import { Cliente } from '../../utilitarios/modelos/Cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PgClientesReg',
  templateUrl: './PgClientesReg.component.html',
  styleUrls: ['./PgClientesReg.component.css']
})
export class PgClientesRegComponent implements OnInit {

  clienteForm: FormGroup|any;
  quiereContacto:boolean = false;
  tituloPagina = "REGISTRO DEL CLIENTE";
  clientes: Cliente[]|any= [];

  constructor(
    private fb: FormBuilder,
    private _router:Router,
    private clienteService: ClienteService
  ){
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      contraseña: ['',[Validators.required]],
      quiereContacto: [false],
      correo: [''],
      telefono: ['', [Validators.maxLength(10)]]
    });
  }

  onSubmit(){
    console.log(this.quiereContacto);
    if (this.clienteForm.value){
      console.log('invalid form');
      return;
    }
    console.log(this.clienteForm.value);
    const cliente = {
      nombre: this.clienteForm.nombre,
      apellido: this.clienteForm.apellido,
      contraseña: this.clienteForm.contraseña,
      email: this.clienteForm.email,
      telefono: this.clienteForm.telefono,
    };
    this.clienteService.crearCliente(cliente).subscribe(data =>{
      console.log(data);
    })
  }
  ngOnInit (): void { 
  }
  
  /*obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (cliente) => {
        this.clientes = cliente;
      }
    });
  }*/

  toggleContacto(): void {
    this.quiereContacto = !this.quiereContacto;
  }
  
  goInicio():void {
    this._router.navigate(['/home']);
  }

  guardarCliente():void{
    if(this.clienteForm.valid){
      this.clienteService.crearCliente({...this.clienteForm.value}).subscribe(
        cliente => {
          if (cliente.data == '1'){
            Swal.fire({
              icon: 'success',
              title: 'Cliente creado',
              text: 'El cliente se ha creado correctamente.',
              confirmButtonText: 'OK'
            }).then( _res =>{
              this.clienteForm.reset();
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por favor, completa correctamente el formulario antes de enviarlo.',
              confirmButtonText: 'OK'
            });
          }
        }
      );
    }
  }

  /*editarCliente(cliente:string): void {
    Swal.fire({
      title: "¿Estás seguro que deseas editar este registro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      icon: "question"
    }).then((res) =>{
      if (res.isConfirmed) {
        this.clienteForm.actualizarCliente(this.clientes, cliente).subscribe((data: { clientes: string; }) =>{
          if(data.clientes == '1'){
            Swal.fire({
              title: 'Mensaje',
              text: 'Vehículo actualizado con éxito',
              icon: 'success'
            });
          }
        });
      }else{
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al actualizar el vehículo. Por favor, intenta nuevamente más tarde.',
          icon: 'error'
        });
      }
    });
  }*/

  /*eliminarCliente(cliente: string): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: '¿Realmente deseas eliminar este cliente?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((res) => {
      if (res.isConfirmed) {
        this.clienteService.eliminarCliente(cliente).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Cliente eliminado',
              text: 'El cliente se ha eliminado correctamente.',
              confirmButtonText: 'OK'
            });
          },
          error: (error) => {
            console.error('Error al eliminar cliente:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar cliente',
              text: 'Ha ocurrido un error al eliminar el cliente. Por favor, intenta nuevamente más tarde.',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }*/

}
