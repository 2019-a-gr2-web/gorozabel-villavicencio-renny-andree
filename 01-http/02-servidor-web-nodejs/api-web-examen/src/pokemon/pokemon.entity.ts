import { Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Entity, OneToMany } from 'typeorm';
import { EntrenadorEntity } from '../entrenador/entrenador.entity';
import { PedidoEntity } from '../pedido/pedido.entity';
import { DetalleEntity } from '../detalle/detalle.entity';

@Entity('pokemon')
export class PokemonEntity{

  @PrimaryGeneratedColumn()
  numeroPokemon:number;

  @Column({
    type:'varchar',
    length:50,
    name:'nombre_pokemon',
  })
  nombrePokemon:string;

  @Column({
    type:'varchar',
    length:30,
    name:'especial1_pokemon'
  })
  poderEspecialUno:string;

  @Column({
    type:'varchar',
    length:30,
    name:'especial2_pokemon'
  })
  poderEspecialDos:string;

  @Column({
    type:'date',
    name:'fecha_captura_pokemon',
  })
  fechaCapturaPokemon:Date;

  @Column({
    type:'int',
    name:'nivel_pokemon'
  })
  nivelPokemon:number;

  @Column({
    type:'double',
    name:'precio_pokemon'
  })
  precioPokemon:number;

  @OneToMany(type => DetalleEntity, detalle => detalle.idPokemon)
  idDetalle:DetalleEntity[];

  @ManyToOne(type=>EntrenadorEntity,entrenador =>entrenador.pokemons)
  entrenador:EntrenadorEntity;


}
