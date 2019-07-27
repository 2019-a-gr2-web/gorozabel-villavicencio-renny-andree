import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {
  constructor(@InjectRepository(PedidoEntity)
              private readonly _pedidoRepository: Repository<PedidoEntity>) {
  }

  crear(pedido:PedidoEntity):Promise<PedidoEntity>{
    const obj = this._pedidoRepository.create(pedido);
    return this._pedidoRepository.save(obj);
  }

  actualizar(id:number,pedido:PedidoEntity):Promise<PedidoEntity>{
    pedido.idPedido=id;
    const obj = this._pedidoRepository.create(pedido);
    return this._pedidoRepository.save(obj);
  }

  listar(parametros?):Promise<PedidoEntity[]>{
    return  this._pedidoRepository.find(parametros);
  }

  buscar(id:number):Promise<PedidoEntity>{
    return  this._pedidoRepository.findOne(id);
  }

  eliminar(id:number):Promise<PedidoEntity>{
    const pedidoEliminar = this._pedidoRepository.create({
      idPedido:id
    });
    return this._pedidoRepository.remove(pedidoEliminar);
  }


}
