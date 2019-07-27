import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrenadorEntity } from '../entrenador/entrenador.entity';
import { PokemonEntity } from '../pokemon/pokemon.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { EntrenadorController } from '../entrenador/entrenador.controller';
import { EntrenadorService } from '../entrenador/entrenador.service';
import { PokemonService } from '../pokemon/pokemon.service';
import { UsuarioService } from '../usuario/usuario.service';
import { DetalleEntity } from './detalle.entity';
import { DetalleController } from './detalle.controller';
import { DetalleService } from './detalle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        DetalleEntity
      ],
      'default'
    ),
  ],//Modulos
  controllers: [
   DetalleController
  ], //Controladores
  providers: [
    DetalleService
  ], //Servicios
  exports:[
    DetalleService
  ] //Exportar servicios
})
export class DetalleModule {

}
