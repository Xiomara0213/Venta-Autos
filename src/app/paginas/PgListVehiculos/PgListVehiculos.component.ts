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

  get filtro(){
    return this._filtro
  }
  set filtro(filtro:string){
    this._filtro = filtro;
    //this.consultaVehiculos();
  }

  @Input() valor:string = '';
  
  
  constructor(
    private vehiculoService: VehiculoService
  ) {}

  ngOnInit() {
    /*this.consultaVehiculos();*/
    console.log('Ingreso a ejercitarse');
    this.vehiculoService.getVehiculos().subscribe( respuesta => {
      console.log(respuesta);
      this.listaVehiculos = respuesta;
    })
  }

  /*mostrar(){
    this.mostrarImagenes = !this.mostrarImagenes;
  }
  /*consultaVehiculos(){
    this.vehiculoService.getVehiculos(this.filtro).subscribe(data =>{
      this.listaVehiculos = data;
    });
  }*/

  /*recepcion(dato:number){
    console.log('Dato:',dato);
  }*/

}
