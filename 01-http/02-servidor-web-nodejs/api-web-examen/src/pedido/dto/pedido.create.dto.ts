import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UsuarioEntity } from '../../usuario/usuario.entity';

export class PedidoCreateDto{

  @IsEmpty()
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
  usuario:UsuarioEntity;

}
