import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PgVehiculo',
  templateUrl: './PgVehiculo.component.html',
  styleUrls: ['./PgVehiculo.component.css']
})
export class PgVehiculoComponent implements OnInit {

  Formulario: FormGroup;
  vehiculo?: Vehiculo;
  formBuilder: any;
  constructor(
    private route: ActivatedRoute,
    private vehiculoServicio: VehiculoService
  ) { 
      this.Formulario = this.formBuilder.group({
        "codigo": ['', [Validators.required, Validators.pattern(/^[a-zA-Z]\d{3}$/)]],
        "marca": ['', [Validators.required]],
        "modelo": ['', [Validators.required]],
        "color": ['', [Validators.required]],
        "kilometraje": ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        "precio": [],
        "anio": ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        "calificacion": ['', [Validators.required, Validators.pattern(/^\d{1}$/)]],
      });
      this.Formulario.controls['codigo'].disable();
    }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.vehiculoServicio.getVehiculo(params['codigo']).subscribe(data =>{
        if(data.codigo == '1'){
          this.vehiculo = data.data;
          this.Formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
          this.Formulario.controls['marca'].setValue(this.vehiculo?.marca);
          this.Formulario.controls['modelo'].setValue(this.vehiculo?.modelo);
          this.Formulario.controls['color'].setValue(this.vehiculo?.color);
          this.Formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);
          this.Formulario.controls['precio'].setValue(this.vehiculo?.precio);
          this.Formulario.controls['anio'].setValue(this.vehiculo?.anio);
          this.Formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);
        }else{
          Swal.fire({
            title: "Mensaje de Alerta",
            text: "No se pudo cargar la información",
            icon: "error"
          });
        }
      });
      //this.vehiculo = this.vehiculoService.getVehiculo(params['codigo']);
    });
  }

  goBack(): void{
    window.history.back();
  }

  guardar(){
    if(this.Formulario.valid){
      this.vehiculoServicio.actualizarVehiculo({...this.Formulario.value}, this.Formulario.controls['codigo'].value).subscribe( data =>{
        if(data.codigo == '1'){
          Swal.fire({
            title: "Mensaje",
            text: "Vehiculo actualizado con exito",
            icon: "info"
          });
        }
      });
    }else{
      Swal.fire({
        title: "Mensaje",
        text: "Faltan llenar campos",
        icon: "error"
      });
    }
  }

  imprimir(){

  }
  get codigoControl(): AbstractControl|null {
    return this.Formulario.get('codigo');
  }
  get kilometrajeControl(): AbstractControl|null {
    return this.Formulario.get('kilometraje');
  }
  get anioControl(): AbstractControl|null {
    return this.Formulario.get('anio');
  }
  get calificacionControl(): AbstractControl|null {
    return this.Formulario.get('calificacion');
  }

}


