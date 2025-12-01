import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  async findByEmail(email: string) {
    return Usuario.findOne({ where: { email } });
  }

  async create(data: any) {
    const usuario = Usuario.create(data);
    return usuario.save();
  }
}
