import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('usuario')
export class UsuarioEntity{

  @PrimaryGeneratedColumn()
  idUsuario:number;

  @Column({
    type:'varchar',
    length:20,
    name:'nombre_usuario',
    unique:true
    })
  nombreUsuario:string;

  @Column({
    type:'varchar',
    length:30,
    name:'psswd_usuario'
  })
  passwordUsuario:string;

  @Column({
    type:'varchar',
    name:'tipo_usuario'
  })
  tipoUsuario:string;

}
