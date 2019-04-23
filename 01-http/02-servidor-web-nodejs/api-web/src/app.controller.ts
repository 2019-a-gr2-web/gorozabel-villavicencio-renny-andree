import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Request,
    Response
} from '@nestjs/common';
import { AppService } from './app.service';

// http.//192.168.1.10:3000/ruta
// http.//192.168.1.10:3000/api
// http.//192.168.1.10:3000/mascotas/crear
// http.//192.168.1.10:3000/mascotas/borrar

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/hello-world')
    getHello(): string {
        return 'Hello World'
    }
    @Post('/hola-mundo')  // METODO HTTP
    @HttpCode(200)
    postHello(){
        return 'Hola Mundo'
    }

    @Put('/privet-mir')
    putHello(){
        return 'Привет, мир'
    }

    @Delete('/alola')
    deleteHello(){
        return 'Alola Mundo'
    }

    @Get('/adivina')
    adivina(@Headers() headers): string {

        console.log('Headers: ',headers);
        const numeroRandomico = Math.round(Math.random()*10);
        const numeroDeCabecera = Number(headers.numero);
        console.log(numeroRandomico);
        if(numeroDeCabecera == numeroRandomico)
            return 'Ok';
        else
            return ':('
    }

    @Get('/consultar')
    consultar(@Query() queryParams){
        console.log(queryParams);
        if(queryParams.nombre){
            return `Hola ${queryParams.nombre}`
        }else{
            return 'Hola extraño'
        }
    }

    @Get('/ciudad/:idciudad')
    ciudad(@Param() parametroRuta){
        switch(parametroRuta.idciudad.toLowerCase()){
            case 'quito':
                return 'Que fueff';
            case 'guayaquil':
                return 'Que maah ñañoshh';
            default:
                return 'Buenas tardes'
        }
    }

    @Post('/registroComida')
    registroComida(
        @Body() parametrosCuerpo,
        @Response() response){
        if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad) {
            const cantidad = Number(parametrosCuerpo.cantidad);
            if(cantidad > 1) {
                response.set('Premio', 'Encebollado');
            }
            return response.send({mensaje:'Registro creado'});
        }
        else
            return response.status(400)
                .send({
                    mensaje:'ERROR, no envía nombre o cantidad',
                    error:400
                })
    }

    @Get('/semilla')
    semilla(
        @Request() request
    ){
        const cookies= request.cookies;
        if(cookies.myCookie){
            return 'ok';
        }else
            return ':(';
    }


    //  -------------------- DEBER CALCULADORA ---------------------    //
    @Get('/sumar')
    @HttpCode(200)
    sumar(
        @Headers() header
    ){
        console.log("Headers: ",header);
        return Number(header.numero1)+Number(header.numero2);
    }

    @Post('/restar')
    @HttpCode(201)
    restar(
        @Body() body
    ){
        console.log("Body: ",body);
        return Number(body.numero1)-Number(body.numero2);
    }

    @Put('/multiplicar')
    @HttpCode(202)
    multiplicar(
        @Query() query
    ){
        console.log("Query: ",query);
        return Number(query.numero1)*Number(query.numero2);
    }

    @Delete('/division')
    @HttpCode(203)
    division(
        @Headers() header,
        @Body() body
    ){
        console.log("Headers: ",header);
        console.log("Body: ",body);
        const n1=Number(header.numero1);
        const n2=Number(body.numero2);
        if(n2==0)
            return "No se puede dividir para 0";

        return n1/n2;
    }

/*
        Segmento Inicial: /api
        1) Segmento Accion: GET    'hello-world'    ->  'Hello World'
        2) Segmento Accion: POST   'hola-mundo'     ->  'Hola Mundo'
        3) Segmento Acción: PUT    'privet-mir'     ->  'Привет, мир'
        4) Segmento Acción: DELETE 'alola'          ->  'Alola Mundo'
 */

}
/*
@NombreDecoradorClase() // Decorador -> FUNCION
class usuario{
  @Atributo() // Decorador
  atributoPublico; // Public
  private atributoPrivado;
  protected atributoProtegido;
  constructor(@Parametro() atributoPublico,
              @OtroParametro() atributoPrivado,
              @OtroOtroParametro() atributoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }
  @MetodoA()
  public metodoPublico(@ParametroA() a){}
  @MetodoB()
  private metodoPrivado(){}
  protected metodoProtegido(){}
}
*/

const json =[
    {
        "llave":"valor",
        "key":"value",
        "nombre":"Renny",
        "edad":21,
        "sueldo":102.3,
        "casado":false,
        "hijos":null,
        "mascotas":[
            "Nessita",
            1,
            1.01,
            false,
            null,
            {
                "nombre":"Nessita",
                "apellido":"GoroVilla"
            }
        ]
    }
];

let objeto:any = {
    propiedad:'valor',
    propiedadDos:'valor2'
};
// Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'valor 3';
delete objeto.propiedadTres; //=>Destruit Danger
objeto.propiedadTres = undefined; // => Destruir
