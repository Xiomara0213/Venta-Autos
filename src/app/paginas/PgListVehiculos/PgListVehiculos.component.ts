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
  public listaVehiculos:Array<Vehiculo> = [];
  
  private _filtro: string = "";

  vehiculo: Vehiculo|any;

  get filtro(){
    return this._filtro
  }
  set filtro(filtro:string){
    this._filtro = filtro;

    //this.consultaVehiculos();
  }

  @Input() valor:string = '';
  
  
  constructor(
    private vehiculoServicio: VehiculoService
  ) {}
  
    
  
  ngOnInit():void {
    /*this.consultaVehiculos();*/
    console.log('Ingreso a ejercitarse');
    this.consultarVehiculos();
    /*this.obtenerVehiculos();*/
  }

  mostrar(){
    this.mostrarImagenes = !this.mostrarImagenes;
  }

  /*consultaVehiculos(){
    this.vehiculoServicio.getVehiculos(this.filtro).subscribe(data =>{
      this.listaVehiculos = data;
    });
  }*/

  recepcion(dato:number){
    console.log('Dato:',dato);
  }

  obtenerVehiculos():void {
    this.vehiculoServicio.getVehiculos().subscribe(vehiculos => this.listaVehiculos = vehiculos);
  }

  consultarVehiculos(){
    this.vehiculoServicio.getVehiculos().subscribe( respuesta => {
      console.log(respuesta);
      this.listaVehiculos = respuesta;
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
    /*this.vehiculoServicio.deleteVehiculo(dato);
      this.vehiculo = this.vehiculoServicio.getVehiculos();*/
  }
  
}
