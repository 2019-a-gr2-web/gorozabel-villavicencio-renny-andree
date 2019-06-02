import {Injectable}  from '@nestjs/common';
import {Comida} from "./interfacesComida/comida"

@Injectable()
export class ComidaService {
  bddComida:Comida[]=[];
  recnum=1;
  constructor(){

  }
  crearComida(nuevaComida:Comida):Comida{
    nuevaComida.idComida=this.recnum;
    this.recnum++;
    this.bddComida.push(nuevaComida)
    return nuevaComida
  }
  eliminarPorId(id:number):Comida[]{
    const indice = this.bddComida.filter(
      (comida)=>{
        return comida.idComida === id
      }
    );
    // @ts-ignore
    this.bddComida.splice(indice,1);
    return this.bddComida;
  }
  buscarPorNombre(nombre:string){
    const resultado = this.bddComida.filter(
      (comida)=>{
        return comida.nombrePlato.includes(nombre)
      }
    );
    return resultado;
  }
}

