import { Injectable } from '@nestjs/common';
import { TipoSensor } from './tipoSensor.entity';

@Injectable()
export class TipoSensorService {
  async getAll() {
    return await TipoSensor.find();
  }
}
