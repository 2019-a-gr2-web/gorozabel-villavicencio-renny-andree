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
import * as Joi from '@hapi/joi';

// const Joi = require('@hapi/joi');
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
        @Request() request,
        @Response() response
    ){
        const cookies= request.cookies;
        const esquemaValidacionNumero = Joi.object().keys({
            numero:Joi.number().integer().required()
        });
        const objetoValidacion={
            numero:cookies.numero
        };

        const resultado = Joi.validate(objetoValidacion,
                     esquemaValidacionNumero);

        if(resultado.error){
            console.log('Resultado; ',resultado);
        }else{
            console.log('Numero valido');
        }

        const cookieSegura = request.signedCookies.fechaServidor;
        if(cookieSegura)
            console.log('Cookie Segura');
        else
            console.log('No es valida esta cookie');
        if(cookies.numero){
            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos+1);
            response.cookie('fechaServidor',
                new Date().getTime(),
                {   //OPCIONES
                    expires:horaFechaServidor,
                    signed: true
                });
            return response.send('ok');
        }else
            return response.send(':(');
    }


    //  -------------------- DEBER CALCULADORA ---------------------    //
    @Get('/sumar')
    @HttpCode(200)
    sumar(
        @Headers() header,
        @Request() request,
        @Response() response
    ){
        const cookies= request.cookies;
        const cookieSig=request.signedCookies;
        if(!cookieSig.intentos){
            response.cookie('intentos','100',{signed:true});
        }
        const n1=Number(header.numero1), n2=Number(header.numero2);
        if(!cookies.usuario)
            response.cookie("usuario","Renny Gorozabel");

        const esquemaValidacionNumero = Joi.object().keys({
            nombre:Joi.string().required(),
            numero1:Joi.number().integer().required(),
            numero2:Joi.number().integer().required()
        });
        const objetoValidacion={
            nombre:cookies.usuario,
            numero1:n1,
            numero2:n2
        };

        const resultado = Joi.validate(objetoValidacion,
            esquemaValidacionNumero);

        if(resultado.error){
            return response.send(`Resultado: ${resultado.error}`);
        }else{
            console.log('To\'o bien');
        }
        const suma=n1+n2;
        const tIntentos=Number(cookieSig.intentos)-suma;
        if(tIntentos<=0) {
            const res = {
                resultado: suma,
                usuario: cookies.usuario,
                mensaje: "Se le acabó el cupo"
            };
            response.send(res);
        }else{
            const res={
                resultado:suma,
                usuario:cookies.usuario,
            };
            if(cookieSig.intentos){
                response.cookie('intentos',tIntentos,{signed:true});
            }
            console.log(tIntentos);
            return response.send(res);
        }


    }

    @Post('/restar')
    @HttpCode(201)
    restar(
        @Body() body,
        @Response() response,
        @Request() request
    ) {
        const cookies = request.cookies;
        const cookieSig = request.signedCookies;
        if (!cookieSig.intentos) {
            console.log("No deberías aparecer");
            response.cookie('intentos', '100', { signed: true });
        }
        const n1 = Number(body.numero1), n2 = Number(body.numero2);
        if (!cookies.usuario)
            response.cookie("usuario", "Renny Gorozabel");

        const esquemaValidacionNumero = Joi.object().keys({
            nombre: Joi.string().required(),
            numero1: Joi.number().integer().required(),
            numero2: Joi.number().integer().required()
        });
        const objetoValidacion = {
            nombre: cookies.usuario,
            numero1: n1,
            numero2: n2
        };

        const resultado = Joi.validate(objetoValidacion,
          esquemaValidacionNumero);

        if (resultado.error) {
            return response.send(`Resultado: ${resultado.error}`);
        } else {
            console.log('To\'o bien');
        }
        const resta = n1 - n2;
        const tIntentos = cookieSig.intentos - resta;
        if(tIntentos<=0) {
            const res = {
                resultado: resta,
                usuario: cookies.usuario,
                mensaje: "Se le acabó el cupo"
            };
            response.send(res);
        }else{
            const res={
                resultado:resta,
                usuario:cookies.usuario,
            };
            if(cookieSig.intentos){
                response.cookie('intentos',tIntentos,{signed:true});
            }
            return response.send(res);
        }
    }

    @Put('/multiplicar')
    @HttpCode(202)
    multiplicar(
        @Query() query,
        @Response() response,
        @Request() request
    ){
        const cookies = request.cookies;
        const cookieSig = request.signedCookies;
        if (!cookieSig.intentos) {
            console.log("No deberías aparecer");
            response.cookie('intentos', '100', { signed: true });
        }
        const n1=Number(query.numero1), n2=Number(query.numero2);
        if(!cookies.usuario)
        response.cookie("usuario","Renny Gorozabel");

        const esquemaValidacionNumero = Joi.object().keys({
            nombre:Joi.string().required(),
            numero1:Joi.number().integer().required(),
            numero2:Joi.number().integer().required()
        });
        const objetoValidacion={
            nombre:cookies.usuario,
            numero1:n1,
            numero2:n2
        };

        const resultado = Joi.validate(objetoValidacion,
            esquemaValidacionNumero);

        if(resultado.error){
        return response.send(`Resultado: ${resultado.error}`);
        }else{
        console.log('To\'o bien');
        }
        const prod=n1*n2;
        const tIntentos=cookieSig.intentos-prod;
        if(tIntentos<=0) {
            const res = {
                resultado: prod,
                usuario: cookies.usuario,
                mensaje: "Se le acabó el cupo"
            };
            response.send(res);
        }else{
            const res={
                resultado:prod,
                usuario:cookies.usuario,
            };
            if(cookieSig.intentos){
                response.cookie('intentos',tIntentos,{signed:true});
            }
            return response.send(res);
        }
    }

    @Delete('/division')
    @HttpCode(203)
    division(
        @Headers() header,
        @Body() body,
        @Response() response,
        @Request() request
    ){
        const cookies = request.cookies;
        const cookieSig = request.signedCookies;
        if (!cookieSig.intentos) {
            console.log("No deberías aparecer");
            response.cookie('intentos', '100', { signed: true });
        }
        const n1=Number(header.numero1), n2=Number(body.numero2);
        if(!cookies.usuario)
        response.cookie("usuario","Renny Gorozabel");

        const esquemaValidacionNumero = Joi.object().keys({
            nombre:Joi.string().required(),
            numero1:Joi.number().integer().required(),
            numero2:Joi.number().integer().min(1).required()
        });
        const objetoValidacion={
            nombre:cookies.usuario,
            numero1:n1,
            numero2:n2
        };

        const resultado = Joi.validate(objetoValidacion,
            esquemaValidacionNumero);

        if(resultado.error){
        return response.send(`Resultado: ${resultado.error}`);
        }else{
        console.log('To\'o bien');
        }
        const div=n1/n2;
        const tIntentos=cookieSig.intentos-div;
        if(tIntentos<=0) {
            const res = {
                resultado: div,
                usuario: cookies.usuario,
                mensaje: "Se le acabó el cupo"
            };
            response.send(res);
        }else{
            const res={
                resultado:div,
                usuario:cookies.usuario,
            };
            if(cookieSig.intentos){
                response.cookie('intentos',tIntentos,{signed:true});
            }
            console.log(tIntentos);
            return response.send(res);
        }
    }

    @Get('inicio')
    inicio(
        @Response() res
    ){
        return res.render('inicio');
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

function holaMundo(){
    console.log('Hola Mundo');
}
const respuestaHolaMundo=holaMundo();
console.log('Resp hola mundo: ',respuestaHolaMundo);

function suma(a:number,b:number):number{
    return a+b;
}
const respuestaSuma = suma(2,3);
console.log('Resp suma: ',respuestaSuma);

// condicionales
// Truty -> true
// Falsy -> false
if(true){ // Truty
    console.log('Verdadero');
}else{
    console.log('Falso');
}

if(false){
    console.log('Verdadero');
}else{
    console.log('Falso');
}

if(""){ //Falsy
    console.log('Verdaero "" ');
}else{
    console.log('Falso "" ');
}

if("a"){ //Truty
    console.log('Verdaero "a" ');
}else{
    console.log('Falso "a" ');
}

if(0){ //Falsy
    console.log('Verdaero 0 ');
}else{
    console.log('Falso 0 ');
}

if("0"){ //Truty
    console.log('Verdaero "0" ');
}else{
    console.log('Falso "0" ');
}

if(-1){ //Truty
    console.log('Verdaero -1 ');
}else{
    console.log('Falso -1 ');
}

if(1){ //Truty
    console.log('Verdaero 1 ');
}else{
    console.log('Falso 1 ');
}

if(undefined){ //Falsy
    console.log('Verdaero "undefined" ');
}else{
    console.log('Falso "undefined" ');
}

if(null){ //Falsy
    console.log('Verdaero "null" ');
}else{
    console.log('Falso "null" ');
}

if({}){ //Truty
    console.log('Verdaero "{}" ');
}else{
    console.log('Falso "{}" ');
}

//Operadores de Arreglo
const arreglo =[
    function(){return 0},
    1,
    'A',
    true,
    null,

];

const arregloNumerosForEach = [1,2,3,4,5,6];

// 1) Imprimir en consola todos los elementos;
// 2) Sumen 2 a los pares y 1 a los Impares
// 3) Encuentre si hay el numero 4
// 4) Filtren los numeros menores a 5
// 5) Tpdps ñps valores positivos
// 6) Algun valor es menor que 2
// 7) Sumar todos los valores
// 8) Restar todos los valores de 100

// 1.1) Sume 10 a todos
// 2.1) Filtre a los mayores a 15
// 3.1) Si hay algun numero mayor a 30

const rForEach=arregloNumerosForEach
    .forEach(
        function (
            valorActual,
            indice,
            arreglo
        ) {
            console.log(`Valor: ${valorActual}`);
            console.log(`Valor: ${indice}`);
            console.log(`Valor: ${arreglo}`);
        }
    );

const arregloNumerosForMap = [1,2,3,4,5,6];
const rMap=arregloNumerosForMap.map(    // Devolver el nuevo valor de ese elemento
    (valorActual)=>{
        const esPar=valorActual%2==0;
        if(esPar)
            return valorActual+2;
        else
            return valorActual+1
    }
);
console.log(`Respuesta Map: ${rMap}`);

const arregloNumerosForFind = [1,2,3,4,5,6];

const rFind = arregloNumerosForFind.find(
    (valorActual)=>{
        return valorActual==4;
    }
);

console.log(`Respuesta Find: ${rFind}`);


const arregloNumerosForFilter = [1,2,3,4,5,6];
const rFilter = arregloNumerosForFilter.filter(
    (valorActual) =>{
        return valorActual < 5;
    }
);

console.log(`Respuesta Filter: ${rFind}`);

const arregloNumerosEvery = [1,2,3,4,5,6];
const bool = arregloNumerosEvery.every(   //Si TODOS cumplen TRUE
                            //si ALGUNO no cumple FALSE
  (valorActual)=>{
      return valorActual > 0
  }
);
console.log(bool);

/* ALGUN valor es menor que 2
const arregloNumerosSome = [1,2,3,4,5,6];
arregloNumerosSome.some(
            // si ALGUNO cumple la condicion tonces la condicion es TRUE


)
*/
// 7 Sumen todos los valores

const arregloNumeroReduce=[1,2,3,4,5,6];
const valorDondeEmpiezaCalculo=0;
const respuestaReduce = arregloNumeroReduce.reduce(
  (acumulado,valorActual) => {
      return acumulado+valorActual;
  },
  valorDondeEmpiezaCalculo
);
console.log(respuestaReduce);

//Menores a 4 le sumen el 10% + 5
//>=a 4 15% + 3

const ejercicioMap=[1,2,3,4,5,6];
const numero0=0;
const ejerMap = ejercicioMap.map(
  (valorActual)=>{
      const menorQ = valorActual < 4;
      if(menorQ)
          return valorActual*(1.1) + 5
      else
          return valorActual*(1.15) + 3
  }
).reduce(
  (acumulado,valorActual)=>{
      return acumulado+valorActual
  },
  numero0
);

console.log(`Respuesta Ejercicio: ${ejerMap}`);

//8 Restar todos los valores de 100

const arreglo100=[1,2,3,4,5,6];
const valorInicial=100;

const res100 = arreglo100.reduce(
  (acumulado,valorActual) => {
      return 100-valorActual;
},
valorInicial
);

console.log(`Respuesta 100: res100`);

// 9 Sumar 10 a todos los elementos

const arregloMas10=[1,2,3,4,5,6];
const respMas10 = arregloMas10.map(
  valorActual =>{
      return valorActual+10;
  }
).filter(
  (valorActual) => {
      return valorActual > 15;
  }
).some(
  (valorActual)=> {
      return valorActual > 30;
  }
);
