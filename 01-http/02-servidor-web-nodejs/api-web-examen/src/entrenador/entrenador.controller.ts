import { Controller, Get, Response, Request, Headers, Post, Body, Res, Session } from '@nestjs/common';
import {EntrenadorService} from "./entrenador.service";
import { PokemonService } from '../pokemon/pokemon.service';
import { UsuarioService } from '../usuario/usuario.service';
import { EntrenadorEntity } from './entrenador.entity';
import { EntrenadorCrearDto } from './dto/entrenador.crear.dto';
import { validate } from 'class-validator';


@Controller('/examen')
export class EntrenadorController {
  constructor(private readonly entrenadorService: EntrenadorService,
              private readonly pokemonService:PokemonService,
              private readonly usuarioService:UsuarioService) {
  }
  @Post('/login')
  async loginCookie1(
    @Res() res,
    @Body('nombre') nombre:string,
    @Body('passwd') passwd:string,
    @Session() session
  ){
    console.log(nombre);
    try {
      var usuarios = await this.usuarioService.listar(
        {
          where: [
            { nombreUsuario: nombre }
          ]
        });
      console.log(usuarios);
      if (usuarios.length == 0) {
        console.log("No existe");
        return res.redirect('/examen/inicioSesion');
      } else {
        if (usuarios[0].passwordUsuario == passwd) {
          session.usuario = usuarios[0];
          console.log(session);
          return res.redirect('/examen/bienvenido');
        } else {
          console.log("Credenciales incorrectas");
          return res.redirect('/examen/inicioSesion');
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
    @Get('/listarEntrenadores')
    async gestionarEntrenadores(
      @Session() session,
      @Res() res) {
      if (session.usuario) {
        try{
          var entrenadores=await this.entrenadorService.listar();
        }catch (e) {
          console.error(e);
        }
        return res.render('Entrenador/listaEntrenador',{entrenadores:entrenadores,nombre:session.usuario.nombreUsuario})
      } else {
        return res.redirect('/examen/inicioSesion');
      }


    }


  @Post('/borrarCookie')
  borrarCookiemethod(
    @Session() session,
    @Res() res
  ) {
    session.usuario=undefined;
    session.destroy();
    res.redirect('/examen/inicioSesion')
  }

  @Get('/inicioSesion')
  inicioSesion(@Response() res){
    return res.render('login')
  }
  @Get('/gestion')
  gestion(@Response() res, @Request() request){
    const cookieSeg = request.signedCookies;
    if (cookieSeg.nombreUsuario) {
      res.redirect('/examen/gestionarComida')
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }
  }

  @Get('/bienvenido')
  bienvenido(
    @Res() res,
    @Session() session
  ){
    console.log(session);
    if (session.usuario) {
      return res.render('paginaprincipal',{
        nombre:session.usuario.nombreUsuario,
        tipo:session.usuario.tipoUsuario
      })
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }


  }
  @Get('/crearEntrenador')
  crearcomida(
    @Res() res,
    @Session() session){
    if (session.usuario) {
      return res.render('Entrenador/crearEntrenador',{
        nombre:session.usuario.nombreUsuario
      })
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }


  }
  @Post('/crearEntrenador')
  async crearcomidaPost(
    @Body() entrenador:EntrenadorEntity,
    @Res() res,
    @Request() request
  ){
    entrenador.fechaNacimientoEntrenador = entrenador.fechaNacimientoEntrenador ? new Date(entrenador.fechaNacimientoEntrenador) : undefined;
    entrenador.numeroMedallasEntrenador = Number(entrenador.numeroMedallasEntrenador);
    if(entrenador.campeonActualEntrenador==undefined)
      entrenador.campeonActualEntrenador=false;
    else
      entrenador.campeonActualEntrenador=true;
    const entrenadorValido = new EntrenadorCrearDto();
    entrenadorValido.nombreEntrenador = entrenador.nombreEntrenador;
    entrenadorValido.apellidoEntrenador = entrenador.apellidoEntrenador;
    entrenadorValido.fechaNacimientoEntrenador = entrenador.fechaNacimientoEntrenador;
    entrenadorValido.numeroMedallasEntrenador = entrenador.numeroMedallasEntrenador;
    entrenadorValido.campeonActualEntrenador = entrenador.campeonActualEntrenador;

    try{
      const errores = await validate(entrenadorValido);
      if(errores.length>0){
        console.error(errores);
        res.redirect('/examen/listarEntrenadores');
      }else{
        const respuesta = await this.entrenadorService.crear(entrenador);
        console.log("Respuesta: ",respuesta);
        res.redirect('/examen/listarEntrenadores');
      }
    }catch (e) {
      console.error(e);
    }
  }
  /*

  @Post('eliminar')
  eliminarcomida(@Res() res,
                 @Body('id') id: number, @Request() request) {
    const cookieSeg = request.signedCookies;
    this.comidaService.eliminarPorId(Number(id));
    if (cookieSeg.nombreUsuario) {
      res.redirect('/examen/gestionarComida');
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }

  }


  @Post('/buscarcomida')
  buscarcomida(@Res() res,
               @Body('busquedaComida') busquedaComida: string, @Request() request) {
    const cookieSeg = request.signedCookies;
    arregloComidaBusqueda=this.comidaService.buscarPorNombre(busquedaComida);
    console.log(arregloComidaBusqueda);
    if(busquedaComida!=null){
      if (cookieSeg.nombreUsuario) {
        res.redirect('/examen/gestionComida');
      }
      else{
        return res.redirect('/examen/inicioSesion');
      }

    }else {
      if (cookieSeg.nombreUsuario) {
        res.redirect('/examen/gestionComida');
      }
      else{
        return res.redirect('/examen/inicioSesion');
      }

    }
  }*/

  @Get('padres')
  async padres(
    @Res() res,
  ){
    try{
      var padres = await this.entrenadorService.listar()
    }catch (e) {
      console.error(e);
      res.send({error:'ERROR'});
    }
    res.send(padres);
  }

}
