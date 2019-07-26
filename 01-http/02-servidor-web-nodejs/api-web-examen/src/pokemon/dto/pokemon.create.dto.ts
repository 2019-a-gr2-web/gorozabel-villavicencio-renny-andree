import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EntrenadorEntity } from '../../entrenador/entrenador.entity';

export class PokemonCreateDto{
  @IsEmpty()
  numeroPokemon:number;

  @IsNotEmpty()
  @IsString()
  nombrePokemon:string;

  @IsNotEmpty()
  @IsString()
  poderEspecialUno:string;

  @IsNotEmpty()
  @IsString()
  poderEspecialDos:string;

  @IsNotEmpty()
  @IsDate()
  fechaCapturaPokemon:Date;

  @IsNotEmpty()
  @IsNumber()
  nivelPokemon:number;

  @IsNotEmpty()
  entrenador:EntrenadorEntity;

  @IsNotEmpty()
  @IsNumber()
  precioPokemon:number;

}
