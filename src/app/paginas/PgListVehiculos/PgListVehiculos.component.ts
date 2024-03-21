import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';

@Component({
  selector: 'app-PgListVehiculos',
  templateUrl: './PgListVehiculos.component.html',
  styleUrls: ['./PgListVehiculos.component.css']
})
export class PgListVehiculosComponent implements OnInit {

  mostrarImagenes = true;

  private _filtro: string = "";

  get filtro(){
    return this._filtro
  }

  set filtro(data:string){
    this._filtro = data;
    this.consultaVehiculos();
  }

  @Input() valor:string = '';
  listaVehiculos:Array<any> = [];
  
  constructor(
    private vehiculoService: VehiculoService
  ) {
  
  }

  ngOnInit() {
    this.consultaVehiculos();
  }

  mostrar(){
    this.mostrarImagenes = !this.mostrarImagenes;
  }
  consultaVehiculos(){
    this.vehiculoService.getVehiculos(this.filtro).subscribe(data =>{
      this.listaVehiculos = data;
    });
  }

  recepcion(dato:number){
    console.log('Dato:',dato);
  }

}
