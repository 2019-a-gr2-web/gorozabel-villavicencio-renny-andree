import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TragosEntity } from './tragos.entity';
import { Repository } from 'typeorm';
import { Trago } from './interfaces/trago';

@Injectable()
export class TragosService {
  bddTragos:Trago[]=[];
  recnum=1;

  constructor(@InjectRepository(TragosEntity)
              private readonly _tragosRepository: Repository<TragosEntity>,){
    const traguito:TragosEntity = {
      id:this.recnum,
      nombre:'Pilsener',
      gradosAlcohol:4.3,
      fechaCaducidad: new Date(2019,5,10),
      precio:1.75,
      tipo:'Cerveza'
    };

    const objetoEntidad = this._tragosRepository.create(traguito);

    this._tragosRepository
      .save(objetoEntidad)
      .then(
        (datos)=>{
          console.log('Dato creado:', datos);
        }
      )
      .catch(
        (error)=>{
          console.error('Error:', error);
        }
      );
    this.crear(traguito);
  }

  buscar(parametrosBusqueda?):Promise<Trago[]>{
    return this._tragosRepository.find(parametrosBusqueda);
  }

  crear(nuevoTrago:TragosEntity):Promise<Trago>{
   /* nuevoTrago.id=this.recnum;
    this.recnum++;
    this.bddTragos.push(nuevoTrago);
    return nuevoTrago*/
   console.log(nuevoTrago);
    const objetoEntidad = this._tragosRepository
     .create(nuevoTrago);
    return this._tragosRepository.save(objetoEntidad);
  }
  buscarPorId(id:number):Trago{
    return this.bddTragos.find(
      (trago)=>{
        return (trago.id === id)
    })
  }
  buscarPorNombre(nombre: string):Trago{
    return this.bddTragos.find(
      (trago) => {
        return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
      }
    );
  }

  eliminarPorId(id:Number):Trago[]{
    const indice = this.bddTragos.findIndex(
      (trago) =>{
        return trago.id === id
      }
    );
    this.bddTragos.splice(indice,1);
    return this.bddTragos;
  }
  actualizarPorId(tragoActualizado:Trago,id:number):Trago[]{
    const indice = this.bddTragos.findIndex(
      (trago) =>{
        return trago.id === id
      }
    );
    tragoActualizado.id = this.bddTragos[indice].id
    this.bddTragos[indice] = tragoActualizado;
    return this.bddTragos;
  }

}
