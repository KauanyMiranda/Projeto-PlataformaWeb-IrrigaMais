import { Injectable } from '@nestjs/common';
import { NecessidadeHidrica } from './necHidrica.entity';

@Injectable()
export class NecessidadeHidricaService {
  async getAll() {
    return await NecessidadeHidrica.find();
  }

  async findById(id: number) {
    return await NecessidadeHidrica.findOne({ where: { id } });
  }
}
