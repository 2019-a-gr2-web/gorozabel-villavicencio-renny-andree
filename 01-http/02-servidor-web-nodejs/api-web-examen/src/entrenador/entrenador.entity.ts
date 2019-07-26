import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PokemonEntity } from '../pokemon/pokemon.entity';

@Entity('entrenador')
export class EntrenadorEntity{

  @PrimaryGeneratedColumn()
  idEntrenador:number;

  @Column({
    type:'varchar',
    length:50,
    name:'nombre_entrenador',
  })
  nombreEntrenador:string;

  @Column({
    type:'varchar',
    length:50,
    name:'apellido_entrenador',
  })
  apellidoEntrenador:string;

  @Column({
    type:'date',
    name:'fecha_nacimiento_entrenador',
  })
  fechaNacimientoEntrenador:Date;

  @Column({
    type:'int',
    name:'numero_medallas_entrenador',
  })
  numeroMedallasEntrenador:number;

  @Column({
    type:'boolean',
    name:'campeon_actual',
  })
  campeonActualEntrenador:boolean;

  @OneToMany(type=>PokemonEntity,poke=>poke.entrenador)
  pokemons:PokemonEntity[];

}
