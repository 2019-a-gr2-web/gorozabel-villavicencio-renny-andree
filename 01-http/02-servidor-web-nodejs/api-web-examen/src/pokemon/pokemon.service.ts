import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonEntity } from './pokemon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PokemonService{
  constructor(@InjectRepository(PokemonEntity)
              private readonly _pokemonRepository:Repository<PokemonEntity>){

  }

  crear(pokemon:PokemonEntity):Promise<PokemonEntity>{
    const objetoRep = this._pokemonRepository.create(pokemon);
    return this._pokemonRepository.save(objetoRep);
  }

  listar(parametros?):Promise<PokemonEntity[]>{
    return this._pokemonRepository.find(parametros);
  }

  actualizar(id:number, pokemon:PokemonEntity):Promise<PokemonEntity>{
    pokemon.numeroPokemon=id;
    const obj= this._pokemonRepository.create(pokemon);
    return this._pokemonRepository.save(obj);
  }

  eliminarPorId(id:number){
    return this._pokemonRepository.delete(id);
  }
  buscar(id:number):Promise<PokemonEntity>{
    return this._pokemonRepository.findOne(id);
  }

}
