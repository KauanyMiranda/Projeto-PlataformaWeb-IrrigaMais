import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PlantaService } from './planta.service';
import { PlantaController } from './planta.controller';
import { RotinaModule } from '../rotina/rotina.modules';
import { DatabaseModule } from '../../database/database.module';
import { SensorModule } from '../sensor/sensor.modules';
import { NecessidadeHidricaService } from './necHidrica.service';
import { OldMiddleware } from 'src/common/middlewares/old.middleware';

@Module({
  imports: [DatabaseModule, RotinaModule, SensorModule],
  providers: [PlantaService, NecessidadeHidricaService],
  controllers: [PlantaController],
  exports: [PlantaService],
})
export class PlantaModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OldMiddleware)
      .forRoutes({ path: 'planta/*', method: RequestMethod.ALL });
  }
}
