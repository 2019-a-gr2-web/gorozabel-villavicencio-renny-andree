import {Controller, Get, Response, Request, Headers, Post, Body, Res, Param} from '@nestjs/common';
import {IngredientesService} from "./ingredientes.service";
import {Ingredientes} from "./interfaces/ingredientes";

let id:number;
let arregloIngredientesBusqueda:Ingredientes[]

@Controller('examen/comida')
export class IngredientesController {
  constructor(private readonly ingredientesService: IngredientesService) {
  }
  @Get('/gestionarIngredientes/:id')
  gestionarHijos(@Param() params, @Headers() headers, @Request() request, @Response() response) {
    id= Number(params.id);
    const cookieSeg = request.signedCookies;
    const arregloingredientes= this.ingredientesService.buscarPorId(Number(id));
    console.log('arrprod:',arregloingredientes);
    if (cookieSeg.nombreUsuario) {
      return response.render('ingredientes/gestionarIngredientes',{id:id,arregloIngredientes:arregloingredientes,nombre:cookieSeg.nombreUsuario})
    }
    else{
      return response.redirect('/examen/inicioSesion');
    }

  }
  @Get('/busquedaIngrediente/:id')
  busquedaHijos(@Param() params, @Headers() headers, @Request() request, @Response() response) {
    id= Number(params.id);
    const cookieSeg = request.signedCookies;
    if (cookieSeg.nombreUsuario) {
      return response.render('ingredientes/gestionarIngredientes',{id:id,arregloIngredientes:arregloIngredientesBusqueda,nombre:cookieSeg.nombreUsuario})
    }
    else{
      return response.redirect('/examen/inicioSesion');
    }
  }


  @Get('/crearIngrediente/:id')
  crearingrediente( @Param() params,@Res() res,@Request() request){
    const cookieSeg = request.signedCookies;
    console.log(id);

    if (cookieSeg.nombreUsuario) {
      return res.render('ingredientes/crearIngrediente',{
        nombre:cookieSeg.nombreUsuario,
        id:id
      })

    }
    else{
      return res.redirect('/examen/inicioSesion');
    }


  }
  @Post('/crearingrediente')
  crearingredientePost(
    @Body() ingrediente:Ingredientes,
    @Res() res,
    @Param() params,
    @Request() request
  ){
    const cookieSeg = request.signedCookies;
    // INGREDIENTE_NOMBRE = INGREDIENTE_NOMBRE
    // INGREDIENTE_DESCRIPCION = INGREDIENTE_DESCRIPCION
    ingrediente.cantidad = Number(ingrediente.cantidad);
    ingrediente.opcional = Boolean(ingrediente.opcional);
    // INGREDIENTE_TIPO = INGREDIENTE_TIPO
    ingrediente.necesitaRefrigeracion = Boolean(ingrediente.necesitaRefrigeracion);
    ingrediente.comidaId = Number(ingrediente.comidaId);
    //ID
    console.log(ingrediente);
    this.ingredientesService.crearIngrediente(ingrediente);
    console.log(this.ingredientesService.bddIngredientes);
    if (cookieSeg.nombreUsuario) {
      res.redirect('/examen/comida/gestionarIngredientes/'+ingrediente.comidaId);
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }


  }
  @Post('eliminarIngredientes')
  eliminaringrediente(@Param() params,@Res() res,  @Body('comidaIdIngre') idComida: number,
                   @Body('idIngrediente') idIngrediente: number, @Request() request) {
    const cookieSeg = request.signedCookies;
    this.ingredientesService.eliminarPorId(Number(idIngrediente),Number(idComida));
    if (cookieSeg.nombreUsuario) {
      res.redirect('/examen/comida/gestionaringredientes/'+id);
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }
  }
  @Get('/buscarIngred/:id')
  buscarIngredientes( @Param() params,@Res() res,@Request() request){
    const cookieSeg = request.signedCookies;
    console.log(id);
    if (cookieSeg.nombreUsuario) {
      return res.redirect('/examen/comida/buscarIngrediente'+id)
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }
  }

  @Post('buscarIngrediente')
  buscaringrediente(@Param() params,@Res() res,
                 @Body('busquedaIngredientes') busquedaIngredientes: string, @Request() request) {
    const cookieSeg = request.signedCookies;
    arregloIngredientesBusqueda=this.ingredientesService.buscarPorNombre(busquedaIngredientes,id);

    if(busquedaIngredientes!=null){
      if (cookieSeg.nombreUsuario) {
        res.redirect('/examen/comida/busquedaIngrediente/'+id);
      }
      else{
        return res.redirect('/examen/inicioSesion');
      }
    }else{
      if (cookieSeg.nombreUsuario) {
        res.redirect('/examen/comida/gestionarIngredientes/'+id);
      }
      else{
        return res.redirect('/examen/inicioSesion');
      }
    }
  }

}
