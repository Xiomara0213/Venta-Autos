import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-PgRegVehiculos',
  templateUrl: './PgRegVehiculos.component.html',
  styleUrls: ['./PgRegVehiculos.component.css']
})
export class PgRegVehiculosComponent implements OnInit {

  Formulario: FormGroup;
  vehiculo?: Vehiculo

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
    this.activatedRoute.params.subscribe( params =>{
      this.vehiculoServicio.getVehiculo(params['codigo']).subscribe( data => {
        this.vehiculo = data;
        this.Formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
        this.Formulario.controls['marca'].setValue(this.vehiculo?.marca);
        this.Formulario.controls['modelo'].setValue(this.vehiculo?.modelo);
      })
    })



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

  goBack(): void{
    window.history.back();
  }
}



