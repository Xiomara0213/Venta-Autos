import { NgModule } from "@angular/core";
import { PgListVehiculosComponent } from "./PgListVehiculos/PgListVehiculos.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PgVehiculoComponent } from "./PgVehiculo/PgVehiculo.component";
import { RouterModule } from "@angular/router";
import { PgRegVehiculosComponent } from "./PgRegVehiculos/PgRegVehiculos.component";
import { UtilitariosModule } from "../utilitarios/UtilitariosModule";
import { PgHomeComponent } from "./PgHome/PgHome.component";
import { PgClientesRegComponent } from "./PgClientesReg/PgClientesReg.component";
import { PgDetVahiculosComponent } from "./PgDetVahiculos/PgDetVahiculos.component";

@NgModule({
    declarations: [
        PgListVehiculosComponent,
        PgRegVehiculosComponent,
        PgVehiculoComponent,
        PgHomeComponent,
        PgDetVahiculosComponent,
        PgClientesRegComponent
    ],
    exports: [
        PgListVehiculosComponent,
        PgRegVehiculosComponent,
        PgVehiculoComponent,
        PgHomeComponent,
        PgDetVahiculosComponent,
        PgClientesRegComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        UtilitariosModule,
        ReactiveFormsModule,
        RouterModule,
    
    ]
})
export class PaginaModule{

}