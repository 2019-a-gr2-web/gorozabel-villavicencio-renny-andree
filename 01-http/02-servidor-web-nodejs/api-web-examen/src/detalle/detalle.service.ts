import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleEntity } from './detalle.entity';

@Injectable()
export class DetalleService {
  constructor(@InjectRepository(DetalleEntity)
              private readonly _detalleRepository: Repository<DetalleEntity>) {
  }

  crear(detalle: DetalleEntity): Promise<DetalleEntity> {
    const obj = this._detalleRepository.create(detalle);
    return this._detalleRepository.save(obj);
  }

  listar(parametros?): Promise<DetalleEntity[]> {
    return this._detalleRepository.find(parametros);
  }

  buscar(id: number): Promise<DetalleEntity> {
    return this._detalleRepository.findOne(id);
  }

  actualizar(id: number, detalle: DetalleEntity): Promise<DetalleEntity> {
    detalle.idDetalle = id;
    const obj = this._detalleRepository.create(detalle);
    return this._detalleRepository.save(obj);
  }

  eliminar(id: number): Promise<DetalleEntity> {
    const detalleEliminar = this._detalleRepository.create({
      idDetalle: id
    });
    return this._detalleRepository.remove(detalleEliminar);
  }
}
