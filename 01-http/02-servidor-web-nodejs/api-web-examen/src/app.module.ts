import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntrenadorModule } from './entrenador/entrenador.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import { EntrenadorEntity } from './entrenador/entrenador.entity';
import { PokemonEntity } from './pokemon/pokemon.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { PedidoEntity } from './pedido/pedido.entity';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name:'default',
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'examen2',
      entities:[
        UsuarioEntity,
        EntrenadorEntity,
        PokemonEntity,
        PedidoEntity
      ],
      synchronize:true,
      dropSchema:false,
      insecureAuth:true
    }),
    EntrenadorModule,
    UsuarioModule,
    PokemonModule,
    PedidoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
