import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TragosModule } from './tragos/tragos.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { TragosEntity } from './tragos/tragos.entity';
import { DistribuidorEntity } from './distribuidor/distribuidor.entity';
import { FiestaEntity } from './fiesta/fiesta.entity';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    /*TypeOrmModule.forRoot({
      name:'default',   // Nombre de la cadena de conexion por defecto de TYPEORM
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [
        TragosEntity,
        DistribuidorEntity,
        FiestaEntity
      ],
      synchronize: true,
      dropSchema:false,
      insecureAuth : true
    }),
    TragosModule,*/
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
