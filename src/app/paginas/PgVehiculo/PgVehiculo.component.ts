import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PgVehiculo',
  templateUrl: './PgVehiculo.component.html',
  styleUrls: ['./PgVehiculo.component.css']
})
export class PgVehiculoComponent implements OnInit {

  Formulario: FormGroup;
  vehiculo?: Vehiculo|any;
  constructor(
    private route: ActivatedRoute,
    private vehiculoServicio: VehiculoService,
    private formBuilder: FormBuilder
  ) { 
      this.Formulario = this.formBuilder.group({
        "codigo": ['', [Validators.required]],
        "marca": ['', [Validators.required]],
        "modelo": ['', [Validators.required]],
        "color": [''],
        "kilometraje": ['', [Validators.required]],
        "precio": [''],
        "anio": ['', [Validators.required]],
        "calificacion": ['', [Validators.required]],
      });
      this.Formulario.controls['codigo'].disable();
    }

  ngOnInit() {
    
  }

  guardar(){
    if(this.Formulario.valid){
      this.vehiculoServicio.putVehiculo({...this.Formulario.value}, this.Formulario.controls['codigo'].value).subscribe( data =>{
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

  editar(codigo: string): void {
    this.vehiculoServicio.postVehiculo(this.vehiculo).subscribe( data =>{
      Swal.fire({
        title: "¿Estás seguro que deseas editar este registro?",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        icon: "question"
      }).then((res) =>{
        if (res.isConfirmed) {
          this.vehiculoServicio.putVehiculo(this.vehiculo, codigo).subscribe(data =>{
            if(data.codigo == '1'){
              Swal.fire({
                title: 'Mensaje',
                text: 'Vehículo actualizado con éxito',
                icon: 'success'
              });
            }
          });
        }else{
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al actualizar el vehículo. Por favor, intenta nuevamente más tarde.',
            icon: 'error'
          });
        }
      });
    });
  }

}


