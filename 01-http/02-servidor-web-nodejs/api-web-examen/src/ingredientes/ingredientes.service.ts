import { Injectable } from '@nestjs/common'
import {Ingredientes} from "./interfaces/ingredientes"

@Injectable()
export class IngredientesService{
  bddIngredientes:Ingredientes[]=[];
  recnum=1;
  constructor(){

  }

  crearIngrediente(nuevoIngrediente:Ingredientes):Ingredientes{
    nuevoIngrediente.idIngrediente = this.recnum;
    this.recnum++;
    this.bddIngredientes.push(nuevoIngrediente);
    return nuevoIngrediente
  }
  eliminarPorId(id:number,idPadre:number):Ingredientes[]{
    const indice = this.bddIngredientes.filter(
      (ingrediente) => {
        return ingrediente.idIngrediente===id && ingrediente.comidaId===idPadre;
      }
    );
    // @ts-ignore
    this.bddIngredientes.splice(indice,1);
    return this.bddIngredientes
  }
  buscarPorNombre(nombre:string,id:number){
    const resultado = this.bddIngredientes.filter(
      (ingrediente) =>{
        return ingrediente.nombreIngrediente.includes(nombre) && ingrediente.comidaId===id
      }
    );
    return resultado
  }
  buscarPorId(id:number){
    const resultado = this.bddIngredientes.filter(
      (ingrediente) => {
        return ingrediente.comidaId === id;
      }
    );
    return resultado
  }
}
