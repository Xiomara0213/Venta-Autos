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

  vehiculos: Vehiculo[]|any;
  public listaVehiculos:Array<Vehiculo>|any = [];
  vehiculo: any;

  get filtro(){
    return this._filtro
  }
  set filtro(filtro:string){
    this._filtro = filtro;
  }
  
  constructor(
    private vehiculoServicio: VehiculoService
  ) {}
  
    
  
  ngOnInit():void {
    this.vehiculoServicio.getVehiculos().subscribe((respuesta:any)=>{
      this.listaVehiculos = respuesta?.data;
    });
  }

  mostrar(){
    this.mostrarImagenes = !this.mostrarImagenes;
  }

  getVehiculos(){
    this.vehiculoServicio.getVehiculos().subscribe((data: any) =>{
      this.listaVehiculos = data?.data;
    })
  }

  /*crearVehiculos():void {
    const nuevoVehiculo = {
      codigo: this.codigo,
      marca: this.marca,
      modelo: this.modelo,
      anio: this.anio,
      kilometraje: this.kilometraje,
      precio: this.precio,
      calificacion: this.calificacion,
    };
  }*/

  /*consultarVehiculos(){
    this.vehiculoServicio.getVehiculo(this.vehiculo).subscribe( data => {
      this.listaVehiculos = data;
    });
  }*/

  eliminar(codigo:string){
    Swal.fire({
      title: "¿Estás seguro que deseas eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      icon: "question"
    }).then((res) =>{
      if(res.isConfirmed){
        this.vehiculoServicio.deleteVehiculo(codigo).subscribe( data =>{
          if(data.codigo == '1'){
            this.getVehiculos();
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
  
}

