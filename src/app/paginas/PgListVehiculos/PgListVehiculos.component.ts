import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';

@Component({
  selector: 'app-PgListVehiculos',
  templateUrl: './PgListVehiculos.component.html',
  styleUrls: ['./PgListVehiculos.component.css']
})
export class PgListVehiculosComponent implements OnInit {

  public mostrarImagenes = false;
  public listaVehiculos:Array<Vehiculo> = [];
  
  private _filtro: string = "";

  //vehiculo: Vehiculo[] = [];

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
    this.vehiculoServicio.getVehiculos().subscribe( respuesta => {
      console.log(respuesta);
      this.listaVehiculos = respuesta;
    })
    this.obtenerVehiculos();
  }

  mostrar(){
    this.mostrarImagenes = !this.mostrarImagenes;
  }

  /*consultaVehiculos(){
    this.vehiculoService.getVehiculos(this.filtro).subscribe(data =>{
      this.listaVehiculos = data;
    });
  }*/

  recepcion(dato:number){
    console.log('Dato:',dato);
  }

  obtenerVehiculos():void {
    this.vehiculoServicio.getVehiculos().subscribe(vehiculos => this.listaVehiculos = vehiculos);
  }

  /*deleteVehiculo(dato: number):void {
    this.vehiculoService.deleteVehiculo(dato);
      this.vehiculo = this.vehiculoService.getVehiculos();
  }*/
  
}
