import { Module} from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { TipoSensorService } from '../tipoSensor/tipoSensor.service';


@Module({
  imports: [],
  controllers: [SensorController],
  providers: [SensorService, TipoSensorService],
  exports: [SensorService]
})
export class SensorModule { }

