import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { EntrenadorService } from '../entrenador/entrenador.service';
import { PokemonService } from '../pokemon/pokemon.service';
import { PedidoEntity } from './pedido.entity';
import { PedidoCreateDto } from './dto/pedido.create.dto';
import { validate } from 'class-validator';
import { PedidoUpdateDto } from './dto/pedido.update.dto';

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
    @Body() pedido
  ){
    console.log(pedido);
    pedido.totalPedido = Number(pedido.totalPedido);
    pedido.totalSinImpuestosPedido = Number(pedido.totalSinImpuestosPedido);
    if(session.usuario){
      pedido.usuario = session.usuario;
      const pedidoValido = new PedidoCreateDto();
      pedidoValido.nombrePedido = pedido.nombrePedido;
      pedidoValido.direccionPedido = pedido.direccionPedido;
      pedidoValido.telefonoPedido = pedido.telefonoPedido;
      pedidoValido.identificacionPedido = pedido.identificacionPedido;
      pedido.estadoPedido = "INICIADO";
      pedidoValido.estadoPedido = pedido.estadoPedido;
      pedidoValido.usuario = session.usuario;
      pedidoValido.totalSinImpuestosPedido = pedido.totalSinImpuestosPedido;
      pedidoValido.totalPedido = pedido.totalPedido;

      try{
        const errores = await validate(pedidoValido);
        if(errores.length>0){
          console.log("Errores");
          console.log(errores);
          res.send({mensaje:errores});
        }else{
          const respuesta = await this.pedidoService.crear(pedido);
          const idPedido = await this.pedidoService.buscar(respuesta.idPedido);
          res.send(idPedido);
        }
      }catch (e) {
        console.error("ERROR");
        console.error(e);
      }
    }else{
      return res.redirect('/examen/inicioSesion');
    }
  }

  @Post('editar')
  async editar(
    @Res() res,
    @Session() session,
    @Body() pedido:PedidoEntity
  ){
    if(session.usuario){
      pedido.idPedido = Number(pedido.idPedido);
      pedido.totalPedido = Number(pedido.totalPedido);
      pedido.totalSinImpuestosPedido = Number(pedido.totalSinImpuestosPedido);
      pedido.estadoPedido = "POR DESPACHAR";
      pedido.usuario = session.usuario;
      try{
        var pedidoA = await this.pedidoService.buscar(pedido.idPedido);
        pedidoA.nombrePedido = pedido.nombrePedido;
        pedidoA.direccionPedido = pedido.direccionPedido;
        pedidoA.telefonoPedido = pedido.telefonoPedido;
        pedidoA.identificacionPedido = pedido.identificacionPedido;
        pedidoA.totalSinImpuestosPedido = pedido.totalSinImpuestosPedido;
        pedidoA.totalPedido = pedido.totalPedido;
        pedidoA.estadoPedido = pedido.estadoPedido;
        pedidoA.usuario = pedido.usuario;
        var parametros={
          where:[]
        };
        pedido.hijos.forEach(
          (it)=>{
            parametros.where.push({
              numeroPokemon:it.numeroPokemon
            })
          }
        );
        var hijos = await this.pokemonService.listar(parametros);
        pedidoA.hijos = hijos;

        const pedidoValido = new PedidoUpdateDto();
        pedidoValido.usuario = pedidoA.usuario;
        pedidoValido.nombrePedido = pedidoA.nombrePedido;
        pedidoValido.direccionPedido = pedidoA.direccionPedido;
        pedidoValido.telefonoPedido = pedidoA.telefonoPedido;
        pedidoValido.identificacionPedido = pedidoA.identificacionPedido;
        pedidoValido.totalPedido = pedidoA.totalPedido;
        pedidoValido.totalSinImpuestosPedido = pedidoA.totalSinImpuestosPedido;
        pedidoValido.hijos = pedidoA.hijos;
        pedidoValido.estadoPedido = pedidoA.estadoPedido;
        pedidoValido.idPedido = pedidoA.idPedido;

        const errores = await validate(pedidoValido);
        if(errores.length>0){
          console.log("ERROES");
          console.log(errores);
          res.redirect('/examen/bienvenido');
        }else{
          const respuesta = await this.pedidoService.actualizar(+pedidoA.idPedido,pedidoA);
          console.log(respuesta);
          res.redirect('/examen/bienvenido');
        }
      }catch (e) {
        console.error(e);
        res.redirect('/examen/bienvenido');
      }
    }else{
      return res.redirect('/examen/inicioSesion');
    }
  }

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
