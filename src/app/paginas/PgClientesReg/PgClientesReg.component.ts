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
  quiereContacto = false;
  tituloPagina = "REGISTRO DEL CLIENTE";
  clientes: Cliente[]|any= [];

  constructor(
    private fb: FormBuilder,
    private _router:Router,
    private clienteService: ClienteService
  ){
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required, Validators.maxLength(30)],
      password: ['', Validators.required],
      email: [''],
      telefono: ['']
    });
  }

  ngOnInit (): void { 
    this.obtenerClientes();
    
  }
  
  obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (cliente) => {
        this.clientes = cliente;
      }
    });
  }

  toggleContacto(): void {
    this.quiereContacto = !this.quiereContacto;
  }
  
  goInicio():void {
    this._router.navigate(['/home']);
  }

  guardar():void{
    if(this.clienteForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa correctamente el formulario antes de enviarlo.',
        confirmButtonText: 'OK'
      });
      return;
    }
    const nuevoCliente = this.clienteForm.value;
    this.clienteService.crearCliente(nuevoCliente).subscribe({
      next:() => {
        Swal.fire({
        icon: 'success',
        title: 'Cliente creado',
        text: 'El cliente se ha creado correctamente.',
        confirmButtonText: 'OK'
        }).then(() => {
          this.clienteForm.reset();
        });
      },
      error: (error) => {
        console.error('Error al crear cliente:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear cliente',
          text: 'Ha ocurrido un error al crear el cliente. Por favor, intenta nuevamente más tarde.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  editar(): void {
    if (this.clienteForm.invalid) {
      return;
    }
    const clienteActualizado = this.clienteForm.value;
    const idCliente = clienteActualizado.id;
    this.clienteService.actualizarCliente(idCliente, clienteActualizado).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Cliente actualizado',
          text: 'El cliente se ha actualizado correctamente.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.clienteForm.reset();
        });
      },
      error: (error) => {
        console.error('Error al actualizar cliente:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar cliente',
          text: 'Ha ocurrido un error al actualizar el cliente. Por favor, intenta nuevamente más tarde.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  eliminarCliente(idCliente: string): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: '¿Realmente deseas eliminar este cliente?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(idCliente).subscribe({
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
  }

}
