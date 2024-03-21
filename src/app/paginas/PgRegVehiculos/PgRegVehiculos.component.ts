import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-PgRegVehiculos',
  templateUrl: './PgRegVehiculos.component.html',
  styleUrls: ['./PgRegVehiculos.component.css']
})
export class PgRegVehiculosComponent implements OnInit {

  Formulario: FormGroup;

  constructor(
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
    let vehiculo:Vehiculo = {...this.Formulario.value};
    this.vehiculoServicio.addVehiculo(vehiculo);
    console.log('Formulario',this.Formulario.value);

    console.log('Formulario:', this.Formulario);
    if(this.Formulario.valid){
      alert('Grabado con Éxito');
    }else{
      alert('Te falta campos de llenar');
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

}



