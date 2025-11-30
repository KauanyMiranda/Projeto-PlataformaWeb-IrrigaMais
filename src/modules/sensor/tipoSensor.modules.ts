import { Module } from '@nestjs/common';
import { TipoSensorService } from './tipoSensor.service';

@Module({
  providers: [TipoSensorService],
  exports: [TipoSensorService],
})
export class TipoSensorModule {}
