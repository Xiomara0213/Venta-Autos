import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';

@Component({
  selector: 'app-PgVehiculo',
  templateUrl: './PgVehiculo.component.html',
  styleUrls: ['./PgVehiculo.component.css']
})
export class PgVehiculoComponent implements OnInit {

  vehiculo?:Vehiculo = {
    codigo: "",
    marca: "",
    modelo: ""
  }
  constructor(
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data =>{
        this.vehiculo = data;
      });
      //this.vehiculo = this.vehiculoService.getVehiculo(params['codigo']);
    });
  }

  goBack(): void{
    window.history.back();
  }

}


