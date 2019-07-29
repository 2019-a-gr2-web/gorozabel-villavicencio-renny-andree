import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PokemonEntity } from '../pokemon/pokemon.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import {  DetalleEntity } from '../detalle/detalle.entity';

@Entity('pedido')
export class PedidoEntity{

  @PrimaryGeneratedColumn()
  idPedido:number;

  @Column({
    type:'varchar',
    length:50,
    name:'nombre_pedido'
  })
  nombrePedido:string;

  @Column({
    type: 'varchar',
    length: 100,
    name:'direccion_pedido'
  })
  direccionPedido:string;

  @Column({
    type:'varchar',
    length:15,
    name:'telefono_pedido'
  })
  telefonoPedido:string;

  @Column({
    type:'varchar',
    length:20,
    name:'identificacion_pedido'
  })
  identificacionPedido:string;

  @Column({
    type:'double',
    name:'total_sin_impuestos_pedido'
  })
  totalSinImpuestosPedido:number;

  @Column({
    type:'double',
    name:'total_pedido'
  })
  totalPedido:number;

  @Column({
    type:'varchar',
    length:'20',
    name:'estado_pedido'
  })
  estadoPedido:string;

  @OneToMany(type => DetalleEntity,detalle => detalle.idPedido,{
    cascade:true,
  })
  idDetalle:DetalleEntity[];

  @ManyToOne(type => UsuarioEntity,user => user.pedidos)
  usuario:UsuarioEntity;

}
