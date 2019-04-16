import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

//@DecoradorClase
class usuario {

  //  @Atributo
    atributoPublico;
    private atributoPrivado;
    protected atributoProtegido;

    constructor(/*@Parametro*/ atributoPublico,
                /*@OtroParametro*/ atributoPrivado,
                /*@MasParametros*/ atributoProtegido) {
        this.atributoPublico = atributoPublico;
        this.atributoPrivado = atributoPrivado;
        this.atributoProtegido = atributoProtegido;
    }

    //@MetodoA()

    @Get()
    getAtributoPrivado(): string{
      return "Hola Mundo en Get"
    }

    @Post()
    @HttpCode(200)
    postHello(){
      return 'Hola Mundo en post';
    }
}
