import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsEmpty()
  @IsNumber()
  totalSinImpuestosPedido:number;

  @IsEmpty()
  @IsNumber()
  totalPedido:number;

  @IsNotEmpty()
  @IsString()
  estadoPedido:string;

}
