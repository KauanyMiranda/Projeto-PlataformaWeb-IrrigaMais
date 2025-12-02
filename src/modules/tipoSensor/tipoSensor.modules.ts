import { Module } from '@nestjs/common';
import { TipoSensorService } from './tipoSensor.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TipoSensorService],
  exports: [TipoSensorService]
})
export class TipoSensorModule {}
