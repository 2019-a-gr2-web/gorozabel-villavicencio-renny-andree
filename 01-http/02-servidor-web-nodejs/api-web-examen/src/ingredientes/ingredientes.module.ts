import { Module } from '@nestjs/common';
import {IngredientesController} from "./ingredientes.controller";
import {IngredientesService} from "./ingredientes.service";
@Module({
  imports: [],//Modulos
  controllers: [IngredientesController], //Controladores
  providers: [IngredientesService], //Servicios
  exports:[IngredientesService] //Exportar servicios
})
export class IngredientesModule {

}
