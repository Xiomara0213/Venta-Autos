import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgHomeComponent } from './paginas/PgHome/PgHome.component';
import { PgListVehiculosComponent } from './paginas/PgListVehiculos/PgListVehiculos.component';
import { PgNotFoundComponent } from './paginas/PgNotFound/PgNotFound.component';
import { PgVehiculoComponent } from './paginas/PgVehiculo/PgVehiculo.component';
import { PgRegVehiculosComponent } from './paginas/PgRegVehiculos/PgRegVehiculos.component';
import { PgClientesRegComponent } from './paginas/PgClientesReg/PgClientesReg.component';

const routes: Routes = [
  {
    path: "home",
    component: PgHomeComponent
  },
  {
    path: "vehiculos",
    component: PgListVehiculosComponent
  },
  {
    path: "vehiculo",
    component: PgRegVehiculosComponent
  },
  {
    path: "vehiculo/:codigo",
    component: PgVehiculoComponent
  },
  {
    path: "clientes",
    component: PgClientesRegComponent
  },
  {
    path: "",
    component: PgHomeComponent,
    pathMatch: "full"
  },
  {
    path: "**",
    component: PgNotFoundComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
