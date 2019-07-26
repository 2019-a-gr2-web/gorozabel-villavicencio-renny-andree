import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService{
  constructor(@InjectRepository(UsuarioEntity) private readonly _usuarioRepository:Repository<UsuarioEntity>){

  }
  crear(usuario: UsuarioEntity):Promise<UsuarioEntity>{
    const objEntity=this._usuarioRepository.create(usuario);
    return this._usuarioRepository.save(objEntity);
  }

  listar(parametro?):Promise<UsuarioEntity[]>{
    return this._usuarioRepository.find(parametro);
  }
  buscar(id):Promise<UsuarioEntity>{
    return this._usuarioRepository.findOne(id);
  }
  actualizar(id:number, usuario:UsuarioEntity):Promise<UsuarioEntity>{
    usuario.idUsuario=id;
    const obj= this._usuarioRepository.create(usuario);
    return this._usuarioRepository.save(obj);
  }
}
