import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrenadorEntity } from '../entrenador/entrenador.entity';
import { EntrenadorService } from '../entrenador/entrenador.service';
import { PedidoEntity } from './pedido.entity';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { PokemonEntity } from '../pokemon/pokemon.entity';
import { PokemonService } from '../pokemon/pokemon.service';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { DetalleEntity } from '../detalle/detalle.entity';
import { DetalleService } from '../detalle/detalle.service';
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        PedidoEntity,
        EntrenadorEntity,
        PokemonEntity,
        UsuarioEntity,
        DetalleEntity
      ],
      'default'
    ),
  ],//Modulos
  controllers: [
    PedidoController
  ], //Controladores
  providers: [
    PedidoService,
    EntrenadorService,
    PokemonService,
    UsuarioService,
    DetalleService
  ], //Servicios
  exports:[
    PedidoService
  ] //Exportar servicios
})
export class PedidoModule {

}
