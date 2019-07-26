import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PokemonEntity } from '../../pokemon/pokemon.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity';

export class PedidoUpdateDto{

  @IsNotEmpty()
  @IsNumber()
  idPedido:number;

  @IsNotEmpty()
  @IsString()
  nombrePedido:string;

  @IsNotEmpty()
  @IsString()
  direccionPedido:string;

  @IsNotEmpty()
  @IsString()
  telefonoPedido:string;

  @IsNotEmpty()
  @IsString()
  identificacionPedido:string;

  @IsNotEmpty()
  @IsNumber()
  totalSinImpuestosPedido:number;

  @IsNotEmpty()
  @IsNumber()
  totalPedido:number;

  @IsNotEmpty()
  @IsString()
  estadoPedido:string;

  @IsNotEmpty()
  hijos:PokemonEntity[];

  @IsNotEmpty()
  usuario:UsuarioEntity;

}
