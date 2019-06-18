import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TragosEntity } from '../tragos/tragos.entity';
import { TragosController } from '../tragos/tragos.controller';
import { TragosService } from '../tragos/tragos.service';
import { DistribuidorEntity } from './distribuidor.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [
        DistribuidorEntity        // PRIMERO ES LA ENTIDAD
      ],
      'default'   // SEGUNDO ES EL NOMBRE DE LA CONEXION
    )
  ],     //Modulos
  controllers:[
  ], //Controladores
  providers:[
  ],   //Servicios
  exports:[
  ]    //Exportar los Servicios
})
export class DistribuidorModule{

}
