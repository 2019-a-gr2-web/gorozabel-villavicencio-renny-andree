import { Controller, Get, Response, Request, Headers, Post, Body, Res, Param, Session } from '@nestjs/common';
import {PokemonService} from "./pokemon.service";
import { PokemonEntity } from './pokemon.entity';
import { PokemonCreateDto } from './dto/pokemon.create.dto';
import { EntrenadorService } from '../entrenador/entrenador.service';
import { validate } from 'class-validator';
import { PokemonUpdateDto } from './dto/pokemon.update.dto';
import { Like } from 'typeorm';


@Controller('examen/pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService,
              private readonly entrenadoService:EntrenadorService) {
  }
  @Get('/listarPokemon/:id')
  async gestionarHijos(
    @Param('id') id:number,
    @Res() res,
    @Session() session) {

    if (session.usuario) {
      try{
        var padre = await this.entrenadoService.buscar(id);
        var pokemons = await this.pokemonService.listar({
          where:[
            {entrenador:padre}
          ]});
        console.log(pokemons);
      }catch (e) {
        console.error(e);
      }
      return res.render('pokemon/gestionarPokemons',{
        id:id,
        pokemons:pokemons,
        nombre:session.usuario.nombreUsuario})
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }

  }
  /*
  @Get('/busquedaPokemon/:id')
  busquedaHijos(
    @Param() params,
    @Headers() headers,
    @Request() request,
    @Response() response) {
    const cookieSeg = request.signedCookies;
    if (cookieSeg.nombreUsuario) {
     // return response.render('pokemon/gestionarIngredientes',{id:id,arregloIngredientes:arregloIngredientesBusqueda,nombre:cookieSeg.nombreUsuario})
    }
    else{
      return response.redirect('/examen/inicioSesion');
    }
  }


  */

  @Post('buscarHijo/:idPadre')
  async buscarPoke(
    @Param('idPadre') idPadre:number,
    @Body('busqueda') parametro,
    @Res() res,
    @Session() session
  ){
    console.log(parametro);
    if(parametro!=""){
      parametro = {
        where:[
          {idEntrenador:idPadre,nombrePokemon:Like("%"+parametro+"%")},
          {idEntrenador:idPadre,nivelPokemon:Like("%"+parametro+"%")}
        ]
      };
      console.log(JSON.stringify(parametro));
      try{
        var hijos = await this.pokemonService.listar(parametro);
      }catch (e) {
        console.log(e);
      }
    }else{
      try {
        var hijos = await this.pokemonService.listar({
          where:[{
            idEntrenador: idPadre
          }]
        });
      }catch (e) {
        console.error(e);
      }
    }
    console.log(hijos);
    return res.render('pokemon/gestionarPokemons',{
      id:idPadre,
      pokemons:hijos,
      nombre:session.usuario.nombreUsuario})
  }

  @Post('editarPokemon/:idPoke')
  async editarPoke(
    @Res() res,
    @Body() pokemon:PokemonEntity,
    @Body('id') idEntrenador:number,
    @Session() session,
    @Param('idPoke') idpoke
  ){
    if(session.usuario){
      pokemon.nivelPokemon = Number(pokemon.nivelPokemon);
      pokemon.fechaCapturaPokemon = pokemon.fechaCapturaPokemon ? new Date(pokemon.fechaCapturaPokemon) : undefined;
      pokemon.precioPokemon = Number(pokemon.precioPokemon);
      try{
        var pokemonA= await this.pokemonService.buscar(idpoke);
        pokemonA.nivelPokemon = pokemon.nivelPokemon;
        pokemonA.fechaCapturaPokemon = pokemon.fechaCapturaPokemon ? new Date(pokemon.fechaCapturaPokemon) : undefined;
        pokemonA.poderEspecialUno = pokemon.poderEspecialUno;
        pokemonA.poderEspecialDos = pokemon.poderEspecialDos;
        pokemonA.precioPokemon = pokemon.precioPokemon;
        pokemonA.nombrePokemon = pokemon.nombrePokemon;
        const entrenador = await this.entrenadoService.buscar(idEntrenador);
        pokemon.entrenador=entrenador;
        pokemonA.entrenador= pokemon.entrenador;
      }catch (e) {
        console.error(e);
      }
      const pokemonValido = new PokemonUpdateDto();
      pokemonValido.numeroPokemon = pokemonA.numeroPokemon;
      pokemonValido.nombrePokemon = pokemonA.nombrePokemon;
      pokemonValido.nivelPokemon = pokemonA.nivelPokemon;
      pokemonValido.fechaCapturaPokemon = pokemonA.fechaCapturaPokemon;
      pokemonValido.poderEspecialDos = pokemonA.poderEspecialDos;
      pokemonValido.poderEspecialUno = pokemonA.poderEspecialUno;
      pokemonValido.entrenador = pokemonA.entrenador;
      pokemonValido.precioPokemon = pokemonA.precioPokemon;
      console.log(pokemonA);

      try{
        const errores = await validate(pokemonValido);
        if(errores.length>0){
          console.log("Errores");
          console.log(errores);
          const pokemons = await this.pokemonService.listar();
          return res.redirect('/examen/pokemon/listarPokemon/'+idEntrenador);
        }else{
          const respuesta = await this.pokemonService.actualizar(+idpoke,pokemonA);
          const pokemons = await this.pokemonService.listar();
          console.log(respuesta);
          return res.redirect('/examen/pokemon/listarPokemon/'+idEntrenador);
        }
      }catch (e) {
        console.error(e);
      }
    }else{
      return res.redirect('/examen/inicioSesion');
    }
  }

  @Get('/crearPokemon/:id/:idpoke')
  async crearingrediente(
    @Param('idpoke') idpoke,
    @Param('id') id,
    @Res() res,
    @Session() session){
    if (session.usuario) {
      if(idpoke!=0){
        try {
          var pokemon = await this.pokemonService.buscar(idpoke);
        }catch (e) {
          console.error(e);
        }
      }
      return res.render('pokemon/crearPokemon',{
        nombre:session.usuario.nombreUsuario,
        id:id,
        idPoke:idpoke,
        pokemon:pokemon
      })

    }
    else{
      return res.redirect('/examen/inicioSesion');
    }


  }
  @Post('/crearPokemon')
  async crearingredientePost(
    @Body() pokemon:PokemonEntity,
    @Body('id') idEntrenador:number,
    @Res() res,
  ){
    pokemon.nivelPokemon = Number(pokemon.nivelPokemon);
    pokemon.fechaCapturaPokemon = pokemon.fechaCapturaPokemon ? new Date(pokemon.fechaCapturaPokemon) : undefined;
    pokemon.precioPokemon = Number(pokemon.precioPokemon);
    try{
      var entrenador = await this.entrenadoService.buscar(idEntrenador);
      pokemon.entrenador = entrenador;
    }catch (e) {
      console.error(e);
    }

    const pokemonValido = new PokemonCreateDto();
    pokemonValido.nombrePokemon = pokemon.nombrePokemon;
    pokemonValido.poderEspecialDos = pokemon.poderEspecialDos;
    pokemonValido.poderEspecialUno = pokemon.poderEspecialUno;
    pokemonValido.fechaCapturaPokemon = pokemon.fechaCapturaPokemon;
    pokemonValido.nivelPokemon = pokemon.nivelPokemon;
    pokemonValido.entrenador = pokemon.entrenador;
    pokemonValido.precioPokemon = pokemon.precioPokemon;

    try{
      const errores = await validate(pokemonValido);
      if(errores.length>0){
        console.log("ERRORES");
        console.log(errores);
        res.redirect("/examen/pokemon/listarPokemon/"+idEntrenador);
      }else{
        const respuesta = await this.pokemonService.crear(pokemon);
        console.log(pokemon);
        console.log(respuesta);
        res.redirect("/examen/pokemon/listarPokemon/"+idEntrenador);
        }
    }catch (e) {
      console.error(e);
    }
  }

  @Post('eliminarPokemon')
  async eliminaringrediente(
    @Param() params,
    @Res() res,
    @Body('idPoke') idPoke: number,
    @Body('id') id:number,
    @Session() session
    ){

    if (session.usuario) {
      try{
        await this.pokemonService.eliminarPorId(idPoke);
      }catch (e) {
        console.error(e);
      }
      res.redirect('/examen/pokemon/listarPokemon/'+id);
    }
    else{
      return res.redirect('/examen/inicioSesion');
    }
  }
  /*
  @Get('/buscarIngred/:id')
  buscarIngredientes( @Param() params,@Res() res,@Request() request){
    const cookieSeg = request.signedCookies;
    console.log(id);
    if (cookieSeg.nombreUsuario) {
      return res.redirect('/examen/entrenador/buscarIngrediente'+id)
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
        res.redirect('/examen/entrenador/busquedaIngrediente/'+id);
      }
      else{
        return res.redirect('/examen/inicioSesion');
      }
    }else{
      if (cookieSeg.nombreUsuario) {
        res.redirect('/examen/entrenador/gestionarIngredientes/'+id);
      }
      else{
        return res.redirect('/examen/inicioSesion');
      }
    }
  }*/

  @Get('hijo/:id')
  async getHijo(
    @Res() res,
    @Session() session,
    @Param('id') id:number
  ){
    try {
      console.log(id);
      var hijo= await this.pokemonService.buscar(id);
      console.log(hijo);
    }catch (e) {
      console.error(e);
      res.send({error:'ERROR'});
    }
    res.send(hijo);
  }

  @Get('hijos/:idPadre')
  async listarHijos(
    @Res() res,
    @Session() session,
    @Param('idPadre') idPadre
  ){
    try {
      var padre = await this.entrenadoService.buscar(idPadre);
      var hijos= await this.pokemonService.listar({where:[{entrenador:padre}]});
    }catch (e) {
      console.error(e);
      res.send({error:'ERROR'});
    }
    res.send(hijos);
  }


}
