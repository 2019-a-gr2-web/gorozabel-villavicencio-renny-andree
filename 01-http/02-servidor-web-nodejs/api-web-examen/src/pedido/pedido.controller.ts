import { Body, Controller, Get, Param, Post, Res, Session } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { EntrenadorService } from '../entrenador/entrenador.service';
import { PokemonService } from '../pokemon/pokemon.service';
import { PedidoEntity } from './pedido.entity';
import { PedidoCreateDto } from './dto/pedido.create.dto';
import { validate } from 'class-validator';
import { PedidoUpdateDto } from './dto/pedido.update.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { DetalleService } from '../detalle/detalle.service';
import { DetalleEntity } from '../detalle/detalle.entity';
import { PokemonEntity } from '../pokemon/pokemon.entity';

@Controller('examen/pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService,
              private readonly entrenadorService:EntrenadorService,
              private readonly pokemonService:PokemonService,
              private readonly usuarioService:UsuarioService,
              private readonly detalleService:DetalleService) {
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

  registrarDetalles(detalle){
    return  this.detalleService.crear(detalle);
  }

  @Post('editar')
  async editar(
          @Res() res,
          @Session() session,
          @Body() objeto,
      ){
  if(session.usuario){
  console.log(objeto);
  const pedido = new PedidoEntity();
  pedido.idPedido = Number(objeto.pedido.idPedido);
  pedido.totalPedido = Number(objeto.pedido.totalPedido);
  pedido.totalSinImpuestosPedido = Number(objeto.pedido.totalSinImpuestosPedido);
  pedido.estadoPedido = "POR DESPACHAR";
  pedido.usuario = session.usuario;
  pedido.nombrePedido = objeto.pedido.nombrePedido;
  pedido.direccionPedido = objeto.pedido.direccionPedido;
  pedido.identificacionPedido = objeto.pedido.identificacionPedido;
  pedido.telefonoPedido = objeto.pedido.telefonoPedido;

  try{
  var pedidoA = await this.pedidoService.buscar(pedido.idPedido);
  var detalle:DetalleEntity[]=[];

  const arrIdPoke = [];
  objeto.detalle.forEach(
          (it,ind)=>{
            var dett = new DetalleEntity();
            var hijo = new PokemonEntity();
            dett.idPedido=pedidoA;
            dett.cantidadDetalle = Number(it.cantidad);
            arrIdPoke.push(it.numeroPokemon);
              /*detalle[ind].idPedido=pedidoA;
              detalle[ind].cantidadDetalle = Number(it.cantidad);
              delete it.cantidad;
              detalle[ind].idPokemon = it;*/
            detalle.push(dett);
          }
        );

        var where=[];
        arrIdPoke.forEach(
          (it) =>{
            where.push({
              numeroPokemon:it
            })
          }
        );

        var parametros ={
          where:where
        };
        console.log(parametros);

        const hijos = await this.pokemonService.listar(parametros);

        hijos.forEach(
          (it,ind)=>{
            detalle[ind].idPokemon=it
          }
        );

        for(let i=0;i<detalle.length;i++)
          await this.detalleService.crear(detalle[i]);

       // pedidoA.idDetalle = detalle;
        pedidoA.nombrePedido = pedido.nombrePedido;
        pedidoA.direccionPedido = pedido.direccionPedido;
        pedidoA.telefonoPedido = pedido.telefonoPedido;
        pedidoA.identificacionPedido = pedido.identificacionPedido;
        pedidoA.totalSinImpuestosPedido = pedido.totalSinImpuestosPedido;
        pedidoA.totalPedido = pedido.totalPedido;
        pedidoA.estadoPedido = pedido.estadoPedido;
        pedidoA.usuario = pedido.usuario;


        const pedidoValido = new PedidoUpdateDto();
        pedidoValido.usuario = pedidoA.usuario;
        pedidoValido.nombrePedido = pedidoA.nombrePedido;
        pedidoValido.direccionPedido = pedidoA.direccionPedido;
        pedidoValido.telefonoPedido = pedidoA.telefonoPedido;
        pedidoValido.identificacionPedido = pedidoA.identificacionPedido;
        pedidoValido.totalPedido = pedidoA.totalPedido;
        pedidoValido.totalSinImpuestosPedido = pedidoA.totalSinImpuestosPedido;
        pedidoValido.estadoPedido = pedidoA.estadoPedido;
        pedidoValido.idPedido = pedidoA.idPedido;



    const errores = await validate(pedidoValido);
        if(errores.length>0){
          console.log("ERROES");
          console.log(errores);
          res.redirect('/examen/bienvenido');
        }else{
          console.log("PEDIDO AAAAAAAAAAAAAAa");
          console.log(pedidoA);
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

  @Get('mostrar')
  async listarPedidos(
    @Res() res,
    @Session() session,
  ){
    if(session.usuario){
      try{
        res.render("pedido/verPedidos",{
          nombre:session.nombreUsuario,
          usuario:session.usuario
        });
      }catch (e) {
        console.error(e)
      }
    }else{
      return res.redirect('/examen/inicioSesion');
    }
  }

  @Get('todos/:idUsuario')
  async listarTodos(
    @Res() res,
    @Param('idUsuario') idUsuario,
    @Session() session
  ){
    if(session.usuario){
      var pedidos;
      try{
        if(idUsuario!=0){
          const usuario = await this.usuarioService.buscar(idUsuario);
          pedidos = await this.pedidoService.listar({
            where:[
              {usuario:usuario}
            ]
          });

        }else{
          pedidos = await this.pedidoService.listar({
            where:[
              {estadoPedido:'POR DESPACHAR'},
              {estadoPedido:'INICIADO'}
            ]
            }
          );
        }
        res.send(pedidos);
      }catch (e) {
        console.error(e);
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

  @Get('despachar/:id')
  async despachar(
    @Res() res,
    @Param('id') idPedido,
    @Session() session
  ){
    if(session.usuario){
      try{
        idPedido = Number(idPedido);
        const pedido = await this.pedidoService.buscar(idPedido);
        pedido.estadoPedido="DESPACHADO";
        const resp = await this.pedidoService.actualizar(+idPedido,pedido);
      }catch (e) {
        console.error(e);
      }
      res.send({mensaje:'Exito'});
    }else
      return res.redirect('/examen/inicioSesion');

  }

  @Get('eliminar/:id')
  async removeItem(
    @Res() res,
    @Param('id') idPedido,
    @Session() session
  ){
    if(session.usuario){
      try{
        const resp = await this.pedidoService.eliminar(idPedido);
      }catch (e) {
        console.error(e);
      }
      res.send({mensaje:'Exito'});
    }else
      return res.redirect('/examen/inicioSesion');

  }

}
