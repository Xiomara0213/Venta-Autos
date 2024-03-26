import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PgListVehiculos',
  templateUrl: './PgListVehiculos.component.html',
  styleUrls: ['./PgListVehiculos.component.css']
})
export class PgListVehiculosComponent implements OnInit {

  public mostrarImagenes = false;
  
  private _filtro: string = "";

  vehiculo: Vehiculo[]|any;
  public listaVehiculos:Array<Vehiculo>|any = [];

  get filtro(){
    return this._filtro
  }
  set filtro(filtro:string){
    this._filtro = filtro;

    //this.consultaVehiculos();
  }
  
  constructor(
    private vehiculoServicio: VehiculoService
  ) {}
  
    
  
  ngOnInit():void {
    //console.log('Ingreso a ejercitarse');
    //this.consultarVehiculos();
    this.obtenerVehiculos();
  }

  mostrar(){
    this.mostrarImagenes = !this.mostrarImagenes;
  }

  obtenerVehiculos():void {
    this.vehiculoServicio.getVehiculos().subscribe( (data) =>{
      console.log('func', data);
      this.listaVehiculos = data;
    });
  }

  consultarVehiculos(){
    this.vehiculoServicio.getVehiculos().subscribe( data => {
      this.listaVehiculos = data;
    });
  }

  eliminar(codigo:string){
    Swal.fire({
      title: "¿Estás seguro que deseas eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      icon: "question"
    }).then((res) =>{
      if(res.isConfirmed){
        this.vehiculoServicio.eliminarVehiculo(codigo).subscribe( data =>{
          if(data.codigo == '1'){
            this.consultarVehiculos();
            Swal.fire({
              title: 'Mensaje',
              text: 'Vehiculo eliminado con éxito',
              icon: "success"
            });
          }
        });
      }
    })
  }
  
  editar(codigo: string): void {
    this.vehiculoServicio.insertVehiculo(this.vehiculo).subscribe( data =>{
      Swal.fire({
        title: "¿Estás seguro que deseas editar este registro?",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        icon: "question"
      }).then((res) =>{
        if (res.isConfirmed) {
          this.vehiculoServicio.actualizarVehiculo(this.vehiculo, codigo).subscribe(data =>{
            if(data.codigo == '1'){
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
    });
  }
}

