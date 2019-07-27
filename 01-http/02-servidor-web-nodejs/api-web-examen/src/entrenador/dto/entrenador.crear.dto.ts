import { IsBoolean, IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EntrenadorCrearDto{

  @IsEmpty()
  idEntrenador:number;

  @IsNotEmpty()
  @IsString()
  nombreEntrenador:string;

  @IsNotEmpty()
  @IsString()
  apellidoEntrenador:string;

  @IsNotEmpty()
  @IsDate()
  fechaNacimientoEntrenador:Date;

  @IsNotEmpty()
  @IsNumber()
  numeroMedallasEntrenador;

  @IsNotEmpty()
  @IsBoolean()
  campeonActualEntrenador:boolean;

}
