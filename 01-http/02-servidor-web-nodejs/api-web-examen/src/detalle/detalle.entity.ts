import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PedidoEntity } from '../pedido/pedido.entity';
import { PokemonEntity } from '../pokemon/pokemon.entity';

@Entity('detalle')
export class DetalleEntity{

  @PrimaryGeneratedColumn()
  idDetalle:number;

  @Column({
    type:'int',
    name:'cantidad'
  })
  cantidadDetalle:number;

  @ManyToOne(type => PedidoEntity,pedido => pedido.idDetalle)
  idPedido:PedidoEntity;

  @ManyToOne(type => PokemonEntity, hijo => hijo.idDetalle)
  idPokemon:PokemonEntity;

}
