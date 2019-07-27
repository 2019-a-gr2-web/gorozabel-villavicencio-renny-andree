import { Module } from '@nestjs/common';
import {PokemonController} from "./pokemon.controller";
import {PokemonService} from "./pokemon.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonEntity } from './pokemon.entity';
import { EntrenadorEntity } from '../entrenador/entrenador.entity';
import { EntrenadorService } from '../entrenador/entrenador.service';
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        PokemonEntity,
        EntrenadorEntity
      ],
'default'
    ),
  ],//Modulos
  controllers: [
    PokemonController
  ], //Controladores
  providers: [
    PokemonService,
    EntrenadorService
  ], //Servicios
  exports:[
    PokemonService
  ] //Exportar servicios
})
export class PokemonModule {

}
