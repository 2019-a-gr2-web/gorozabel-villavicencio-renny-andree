import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { EntrenadorService } from '../entrenador/entrenador.service';
import { PokemonService } from '../pokemon/pokemon.service';
import { PedidoEntity } from './pedido.entity';
import { PedidoCreateDto } from './dto/pedido.create.dto';
import { validate } from 'class-validator';

@Controller('examen/pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService,
              private readonly entrenadorService:EntrenadorService,
              private readonly pokemonService:PokemonService) {
  }

  @Post('crear/nuevo')
  async nuevoPedido(
    @Res() res,
    @Session() session,
    @Body() pedido:PedidoEntity
  ){
    if(session.usuario){
      const pedidoValido = new PedidoCreateDto();
      pedidoValido.nombrePedido = pedido.nombrePedido;
      pedidoValido.direccionPedido = pedido.direccionPedido;
      pedidoValido.telefonoPedido = pedido.telefonoPedido;
      pedidoValido.identificacionPedido = pedido.identificacionPedido;
      pedido.estadoPedido = "INICIADO";
      pedidoValido.estadoPedido = pedido.estadoPedido;
      try{
        const errores = await validate(pedidoValido);
        if(errores.length>0){
          console.log("Errores");
          console.log(errores);
          res.send({mensaje:errores});
        }else{
          const respuesta = await this.pedidoService.crear(pedido);
          res.send({mensaje:'Cabecera registrada con exito'});
        }
      }catch (e) {
        console.error(e);
      }
    }
  }

  @Post('editar')

  @Get('crear')
  nuevo(
    @Res() res,
    @Session() session
  ){
    if(session.usuario){
      res.render('pedido/crearPedido',{
        nombre:session.usuario.nombreUsuario
      })
    }else{
      return res.redirect('/examen/inicioSesion');
    }
  }

}
