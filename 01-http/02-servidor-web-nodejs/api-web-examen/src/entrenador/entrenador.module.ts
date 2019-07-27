import { Module } from '@nestjs/common';
import {EntrenadorController} from "./entrenador.controller";
import {EntrenadorService} from "./entrenador.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrenadorEntity } from './entrenador.entity';
import { PokemonEntity } from '../pokemon/pokemon.entity';
import { PokemonService } from '../pokemon/pokemon.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { PokemonModule } from '../pokemon/pokemon.module';
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        EntrenadorEntity,
        PokemonEntity,
        UsuarioEntity
      ],
      'default'
    ),
  ],//Modulos
  controllers: [
    EntrenadorController
  ], //Controladores
  providers: [
    EntrenadorService,
    PokemonService,
    UsuarioService
  ], //Servicios
  exports:[
    EntrenadorService
  ] //Exportar servicios
})
export class EntrenadorModule {

}
