import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TragosEntity } from '../tragos/tragos.entity';


@Entity('db_fiesta')
export class FiestaEntity{
  @PrimaryGeneratedColumn()
  id_fiesta:number;

  @Column()
  nombre:string;

  @ManyToOne(type=>TragosEntity,
    trago=>trago.fiestas)
  tragoId:TragosEntity;

}
