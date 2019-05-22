import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { TragosService } from './tragos.service';
import { Trago } from './interfaces/trago';
import { type } from 'os';
import { typeIsOrHasBaseType } from 'tslint/lib/language/typeUtils';

@Controller('api/traguito')
export class TragosController{

  constructor(private readonly _tragosServices:TragosService){

  }

  @Get('lista')
  listarTragos(
    @Res() res
  ){
    const arregloTragos = this._tragosServices.bddTragos;
    res.render('tragos/lista-tragos',{
      arregloTragos:arregloTragos
    })
  }
  @Get('crear')
  crearTrago(
    @Res() res
  ){
    const arregloTragos = this._tragosServices.bddTragos;
    res.render('tragos/crear-editar')
  }
  @Post('crear')
  crearTragoPost(
    @Res() res,
    @Body() trago:Trago,
    /*@Body('nombre') nombre:String,
    @Body('tipo') tipo:String,
    @Body('gradosAlcohol') gradosAlcohol:Number,
    @Body('fechaCaducidad') fechaCaducidad:Date,
    @Body('precio') precio:Number,*/
  ){
    trago.gradosAlcohol = Number(trago.gradosAlcohol);
    trago.precio = Number(trago.precio);
    trago.fechaCaducidad = new Date(trago.fechaCaducidad);
    console.log('Trago: ',trago, typeof trago);
    this._tragosServices.crear(trago);
    res.redirect('lista')
  /*  console.log('Nombre: ',nombre,typeof nombre);
    console.log('Tipo: ',tipo,typeof tipo);
    console.log('Grados: ',gradosAlcohol,typeof gradosAlcohol);
    console.log('Fecha de Caducidad: ',fechaCaducidad,typeof fechaCaducidad);
    console.log('Precio: ',precio,typeof precio); */
  }

  @Post('eliminar')
  eliminarTraguito(
    @Res() res,
    @Body() traguito
  ){
    this._tragosServices.eliminarPorId(traguito.indice);
    console.log(traguito.indice);
    res.redirect('lista')
  }

}
