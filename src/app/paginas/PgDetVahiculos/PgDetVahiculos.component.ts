import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-PgDetVahiculos',
  templateUrl: './PgDetVahiculos.component.html',
  styleUrls: ['./PgDetVahiculos.component.css']
})
export class PgDetVahiculosComponent implements OnInit {

  @Input() calificacion:number= 0;
  @Output() accionClick = new EventEmitter<any>();
  lista:Array<any> = [];
  vehiculo: any;
  formulario: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vehiculoServicio: VehiculoService
  ) { 
    this.formulario = this.formBuilder.group({
      "codigo": ['',[Validators.required]],
      "modelo": ['',[Validators.required]],
      "marca": ['',[Validators.required]],
      "color": [''],
      "kilometraje": ['',[Validators.required]],
      "precio": ['',[Validators.required]],
      "anio": ['',[Validators.required]],
      "calificacion": ['',[Validators.required]],
    });
    this.formulario.controls['codigo'].disable();
  }
  
  ngOnInit() {
    this.route.params.subscribe((params: { [ x: string ]: string; }) =>{
      this.vehiculoServicio.getVehiculo(params['codigo']).subscribe(data =>{
        if(data.codigo == '1'){
          this.vehiculo = data.data;
          this.formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
          this.formulario.controls['marca'].setValue(this.vehiculo?.marca);
          this.formulario.controls['modelo'].setValue(this.vehiculo?.modelo);
          this.formulario.controls['color'].setValue(this.vehiculo?.color);
          this.formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);
          this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
          this.formulario.controls['anio'].setValue(this.vehiculo?.anio);
          this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);
        }else{
          Swal.fire({
            title: "Mensaje de Alerta",
            text: "No se pudo cargar la información",
            icon: "error"
          });
        }
      });
    });
  }

}
