import { Injectable } from '@nestjs/common';
import { TipoSensor } from './tipoSensor.entity';

@Injectable()
export class TipoSensorService {
  async getAll(): Promise<TipoSensor[]> {
    return await TipoSensor.find();
  }

  async findById(id: number): Promise<TipoSensor | null> {
    return await TipoSensor.findOne({ where: { id } });
  }
}
