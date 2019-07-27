import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [
        UsuarioEntity
      ],
      'default'
    )
  ],
  controllers:[
    UsuarioController
  ],
  providers:[
    UsuarioService
  ],
  exports:[
    UsuarioService
  ]
})
export class UsuarioModule{

}
