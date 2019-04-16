import {Controller, Delete, Get, Headers, HttpCode, Post, Put} from '@nestjs/common';
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
}
// Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'valor 3';
delete objeto.propiedadTres; //=>Destruit Danger
objeto.propiedadTres = undefined; // => Destruir
