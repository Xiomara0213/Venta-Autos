import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PgRegVehiculos',
  templateUrl: './PgRegVehiculos.component.html',
  styleUrls: ['./PgRegVehiculos.component.css']
})
export class PgRegVehiculosComponent implements OnInit {

  Formulario: FormGroup;
  vehiculo?: Vehiculo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehiculoServicio: VehiculoService,
    private formBuilder: FormBuilder
  ) {
    this.Formulario = this.formBuilder.group({
      "codigo": ['', [Validators.required, Validators.pattern(/^[a-zA-Z]\d{3}$/)]],
      "marca": ['', [Validators.required]],
      "modelo": ['', [Validators.required]],
      "color": ['', [Validators.required]],
      "kilometraje": ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      "precio": ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      "foto": ['', Validators.required],
      "anio": ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      "calificacion": ['', [Validators.required, Validators.pattern(/^\d{1}$/)]],
    });
  }
  
  ngOnInit() {

  }

  guardar(){
    /*let vehiculo:Vehiculo = {...this.Formulario.value};
    this.vehiculoServicio.addVehiculo(vehiculo);
    console.log('Formulario',this.Formulario.value);*/

    if(this.Formulario.valid){
      this.vehiculoServicio.insertVehiculo({...this.Formulario.value}).subscribe(
        respuesta => {
          if (respuesta.codigo == '1'){
            Swal.fire({
              title: "Mensaje",
              text: "Vehiculo Registrado con éxito",
              icon: "success"
            });
          }else{
            Swal.fire({
              title: "Mensaje",
              text: "No se pude registrar el vehiculo: "+respuesta.mensaje,
              icon: "error"
            });
          }
        }
      );
    }else{
      Swal.fire({
        title: "Mensaje",
        text: "Faltan llenar campos?",
        icon: "error"
      });
    }
  }

  get codigoControl(): AbstractControl|null {
    return this.Formulario.get('codigo');
  }
  get kilometrajeControl(): AbstractControl|null {
    return this.Formulario.get('kilometraje');
  }
  get precioControl(): AbstractControl|null {
    return this.Formulario.get('precio');
  }
  get anioControl(): AbstractControl|null {
    return this.Formulario.get('anio');
  }
  get calificacionControl(): AbstractControl|null {
    return this.Formulario.get('calificacion');
  }

  goBack(): void{
    window.history.back();
  }
}



