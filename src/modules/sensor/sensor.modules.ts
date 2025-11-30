import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { DatabaseModule } from '../../database/database.module';
import { TipoSensorModule } from './tipoSensor.modules';
import { OldMiddleware } from 'src/common/middlewares/old.middleware';

@Module({
  imports: [DatabaseModule, TipoSensorModule],
  controllers: [SensorController],
  providers: [SensorService],
  exports: [SensorService],
})
export class SensorModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OldMiddleware)
      .forRoutes({ path: 'sensor/*', method: RequestMethod.ALL });
  }
}
