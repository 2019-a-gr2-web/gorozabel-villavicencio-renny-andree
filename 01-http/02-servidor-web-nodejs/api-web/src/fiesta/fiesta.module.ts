import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiestaEntity } from './fiesta.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [
        FiestaEntity        // PRIMERO ES LA ENTIDAD
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
export class FiestaModule{

}
