import { Injectable } from '@nestjs/common';
import { Trago } from './interfaces/trago';

@Injectable()
export class TragosService {
  bddTragos:Trago[]=[];
  recnum=1

  crear(nuevoTrago:Trago){
    nuevoTrago.id=this.recnum;
    this.recnum++;
    this.bddTragos.push(nuevoTrago);
    return nuevoTrago
  }
  buscarPorId(id:number){
    return this.bddTragos.find(
      (trago)=>{
        return (trago.id === id)
    })
  }
  eliminarPorId(id:Number){
    const indice = this.bddTragos.findIndex(
      (trago) =>{
        return trago.id === id
      }
    );
    this.bddTragos.splice(indice,1);
    return this.bddTragos;
  }
  actualizarPorId(tragoActualizado:Trago,id:number){
    const indice = this.bddTragos.findIndex(
      (trago) =>{
        return trago.id === id
      }
    );
    tragoActualizado.id = this.bddTragos[indice].id
    this.bddTragos[indice] = tragoActualizado;
  }

}
