import {Injectable}  from '@nestjs/common';
import {Comida} from "./dto/comida"
import { InjectRepository } from '@nestjs/typeorm';
import { EntrenadorEntity } from './entrenador.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntrenadorService {
  constructor(@InjectRepository(EntrenadorEntity)
              private readonly _entrenadorRepository: Repository<EntrenadorEntity>) {
  }

  crear(entrenador: EntrenadorEntity): Promise<EntrenadorEntity> {
    const obj = this._entrenadorRepository.create(entrenador);
    return this._entrenadorRepository.save(obj);
  }
  listar(parametros?):Promise<EntrenadorEntity[]>{
    return this._entrenadorRepository.find(parametros);
  }
  buscar(id:number):Promise<EntrenadorEntity>{
    return this._entrenadorRepository.findOne(id);
  }
  actualizar(id:number,entrenador:EntrenadorEntity):Promise<EntrenadorEntity>{
    entrenador.idEntrenador = id;
    const obj = this._entrenadorRepository.create(entrenador);
    return this._entrenadorRepository.save(obj);
  }
}

