import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { TragosService } from './tragos.service';
import { Trago } from './interfaces/trago';
import { type } from 'os';
import { typeIsOrHasBaseType } from 'tslint/lib/language/typeUtils';
import { TragosEntity } from './tragos.entity';
import { TragosCreateDto } from './dto/tragos.create.dto';
import { validate } from 'class-validator';

@Controller('api/traguito')
export class TragosController{

  constructor(private readonly _tragosServices:TragosService){

  }

  @Get('lista')
  async listarTragos(@Res() res) {
    const arregloTragos = await this._tragosServices.buscar();
    res.render('tragos/lista-tragos', {arregloTragos: arregloTragos})
  }

  @Get('editar/:id')
  async actualizarTrago(
    @Param('id') id: string,
    @Res() response,
    @Query('mensaje') mensaje:string
  ) {
    console.log(Number(id));
    const tragoAActualizar = await this
      ._tragosServices
      .buscarId(Number(id));
    console.log('trago', tragoAActualizar.nombre);

    return response.render(
      'tragos/crear-editar',
      {mensaje: mensaje,
        trago: tragoAActualizar,
      crear:false})
  }


  @Post('actualizar-trago/:id')
  async actualizarTragoForm(
    @Param('id') id: string,
    @Res() response,
    @Body() trago: TragosEntity
  ) {
    trago.id = +id;
    await this._tragosServices.actualizar(+id, trago);
    response.redirect('/api/traguito/lista');
  }

  @Get('crear')
  crearTrago(
    @Res() res,
    @Query('mensaje') mensaje:string
  ){
    const arregloTragos = this._tragosServices.bddTragos;
    res.render('tragos/crear-editar',{
      mensaje:mensaje,
      crear:true
    })
  }
  @Post('crear-trago')
  async crearTragoPost(
    @Res() res,
    @Body() trago:TragosEntity,
    /*@Body('nombre') nombre:String,
    @Body('tipo') tipo:String,
    @Body('gradosAlcohol') gradosAlcohol:Number,
    @Body('fechaCaducidad') fechaCaducidad:Date,
    @Body('precio') precio:Number,*/
  ){
    trago.gradosAlcohol = Number(trago.gradosAlcohol);
    trago.precio = Number(trago.precio);
    trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;
    console.log('Trago: ',trago, typeof trago);

    let tragoAValidar = new TragosCreateDto()
    tragoAValidar.nombre = trago.nombre;
    tragoAValidar.tipo = trago.tipo;
    tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
    tragoAValidar.precio = trago.precio;
    tragoAValidar.gradosAlcohol = trago.gradosAlcohol;

    try{
      const errores = await validate(tragoAValidar);

      if(errores.length>0){
        console.log("Errores");
        console.error(errores);
        res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario');

      } else {
          const respuestaCrear = await this._tragosServices
            .crear(trago); // Promesa
          console.log('RESPUESTA: ', respuestaCrear);
          res.redirect('/api/traguito/lista');
      }
    }catch(e){
      res.status(500);
      res.send({mensaje:'Error',codigo:500});
    }


  /*  console.log('Nombre: ',nombre,typeof nombre);
    console.log('Tipo: ',tipo,typeof tipo);
    console.log('Grados: ',gradosAlcohol,typeof gradosAlcohol);
    console.log('Fecha de Caducidad: ',fechaCaducidad,typeof fechaCaducidad);
    console.log('Precio: ',precio,typeof precio); */
  }

  @Post('eliminar')
  async eliminarTraguito(
    @Res() res,
    @Body('indice') indice:String
  ){
    console.log("Indice: ",indice);
    try{
      await this._tragosServices.eliminarId(Number(indice));
      res.redirect('lista')
    }catch(e){
      console.error(e);
      res.status(500);
      res.send({mensaje: 'Error', codigo: 500});
    }
  }

}
