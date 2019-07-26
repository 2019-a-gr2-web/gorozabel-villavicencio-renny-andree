import { Module } from '@nestjs/common';
import { ComunicacionGateway } from './comunicacion.gateway';

@Module({
  providers:[
    ComunicacionGateway
  ]
})
export class ComunicacionModule{

}
