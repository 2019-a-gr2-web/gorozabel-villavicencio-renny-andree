import { Module } from '@nestjs/common';
import { AhorcadoGateway } from './ahorcado.gateway';

@Module({
  providers:[
    AhorcadoGateway
  ]
})
export class AhorcadoModule{

}
