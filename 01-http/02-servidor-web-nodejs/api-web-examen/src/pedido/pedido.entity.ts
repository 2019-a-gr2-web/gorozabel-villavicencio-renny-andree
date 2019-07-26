import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PokemonEntity } from '../pokemon/pokemon.entity';

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

  @ManyToMany(type=>PokemonEntity,pokemon => pokemon.pedidos)
  hijos:PokemonEntity[];

}
