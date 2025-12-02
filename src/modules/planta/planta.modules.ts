import { Module } from '@nestjs/common';
import { NecHidricaService } from '../necHidrica/necHidrica.service';
import { PlantaController } from './planta.controller';
import { PlantaService } from './planta.service';
import { SensorModule } from '../sensor/sensor.modules';
import { NecHidricaModule } from '../necHidrica/necHidrica.modules';
import { RotinaModule } from '../rotina/rotina.modules';

@Module({
  imports: [
    SensorModule,
    RotinaModule,     
    NecHidricaModule,
],
  controllers: [PlantaController],
  providers: [PlantaService, NecHidricaService],
  exports: [PlantaService]
})
export class PlantaModule { }
