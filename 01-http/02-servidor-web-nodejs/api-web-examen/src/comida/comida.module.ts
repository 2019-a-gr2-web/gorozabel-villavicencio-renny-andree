import { Module } from '@nestjs/common';
import {ComidaController} from "./comida.controller";
import {ComidaService} from "./comida.service";
@Module({
  imports: [],//Modulos
  controllers: [ComidaController], //Controladores
  providers: [ComidaService], //Servicios
  exports:[ComidaService] //Exportar servicios
})
export class ComidaModule {

}
