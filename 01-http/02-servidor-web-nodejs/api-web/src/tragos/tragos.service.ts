import { Injectable } from '@nestjs/common';
import { Trago } from './interfaces/trago';

@Injectable()
export class TragosService {
  bddTragos:Trago[]=[];
  recnum=1

  crear(nuevoTrago:Trago):Trago{
    nuevoTrago.id=this.recnum;
    this.recnum++;
    this.bddTragos.push(nuevoTrago);
    return nuevoTrago
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
