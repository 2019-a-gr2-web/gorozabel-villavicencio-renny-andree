import { Module } from '@nestjs/common';
import { TragosController } from './tragos.controller';
import { TragosService } from './tragos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TragosEntity } from './tragos.entity';

  @Module({
    imports:[
      TypeOrmModule.forFeature(
        [
          TragosEntity        // PRIMERO ES LA ENTIDAD
        ],
        'default'   // SEGUNDO ES EL NOMBRE DE LA CONEXION
      )
    ],     //Modulos
    controllers:[
      TragosController
    ], //Controladores
    providers:[
      TragosService
    ],   //Servicios
    exports:[
      TragosService
    ]    //Exportar los Servicios
  })
  export class TragosModule{

  }
