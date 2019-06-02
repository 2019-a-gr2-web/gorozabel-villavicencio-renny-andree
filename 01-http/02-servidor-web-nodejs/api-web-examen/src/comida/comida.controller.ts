import {Controller, Get, Response, Request, Headers, Post, Body, Res} from '@nestjs/common';
import {Comida} from "./interfacescomida/comida";
import {isEmpty} from "@nestjs/common/utils/shared.utils";
import {ComidaService} from "./comida.service";
import {Ingredientes} from "../ingredientes/interfaces/ingredientes";

let arregloComidaBusqueda:Comida[];

@Controller('/examen')
export class ComidaController {
  constructor(private readonly comidaService: ComidaService) {
  }
  @Post('/login')
  loginCookie1(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
    const cookieSeg = request.signedCookies;
    if (!cookieSeg.nombreUsuario) {
      response.cookie('nombreUsuario', nombre.toUpperCase(),{signed: true});
      cookieSeg.nombreUsuario=nombre.toUpperCase();
    }
    if (cookieSeg.nombreUsuario) {
      response.redirect('/examen/bienvenido')
    }
    else{
      return response.redirect('/examen/inicioSesion');
    }

  }
  @Get('/gestionarComida')
  gestionarComida(@Request() request, @Response() response) {
    const cookieSeg = request.signedCookies;
    const arregloComida = this.comidaService.bddComida;
    if (cookieSeg.nombreUsuario) {
      return response.render('Comida/gestionComida',{arregloComida:arregloComida,nombre:cookieSeg.nombreUsuario})
    } else {
      return response.redirect('/examen/inicioSesion');
    }


  }


  @Get('/gestionComida')
  gestionarComida1(@Headers() headers, @Request() request, @Response() response) {
    const cookieSeg = request.signedCookies;

    if (cookieSeg.nombreUsuario) {

      return response.render('Comida/gestionComida',{arregloComida:arregloComidaBusqueda,nombre:cookieSeg.nombreUsuario})
    }
    else{
      return response.redirect('/examen/inicioSesion');
    }




  }@Post('/borrarCookie')
  borrarCookiemethod(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
    response.clearCookie("nombreUsuario");
    response.redirect('/examen/inicioSesion')
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
  bienvenido(@Response() res,  @Request() request){
    const cookieSeg = request.signedCookies;

    if (cookieSeg.nombreUsuario) {

      return res.render('paginaprincipal',{
        nombre:cookieSeg.nombreUsuario
      })
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }


  }
  @Get('/crearcomida')
  crearcomida( @Res() res,@Request() request){
    const cookieSeg = request.signedCookies;
    if (cookieSeg.nombreUsuario) {
      return res.render('Comida/crearcomida',{
        nombre:cookieSeg.nombreUsuario
      })
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }


  }
  @Post('/crearcomida')
  crearcomidaPost(
    @Body() comida:Comida,
    @Res() res,
    @Request() request
  ){
    const cookieSeg = request.signedCookies;

    // COMIDA_NOMBRE = COMIDA NOMBRE
    // COMIDA_DESCRIPCION = COMIDA_DESCRIPCION
    // COMIDA_PREPARACION = COMIDA_PREPARACION
    // COMIDA_NACIONALIDAD = COMIDA_NACIONALIDAD
    comida.numeroPersonas = Number(comida.numeroPersonas);

    comida.picante= Boolean(comida.picante);
    console.log(comida);
    this.comidaService.crearComida(comida);
    if (cookieSeg.nombreUsuario) {
      res.redirect('/examen/gestionarComida');
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }
  }

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
  }

}
