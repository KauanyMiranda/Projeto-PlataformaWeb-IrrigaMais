import { Module } from '@nestjs/common';
import { PlantaService } from './planta.service';
import { PlantaController } from './planta.controller';
import { RotinaModule } from '../rotina/rotina.modules';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule, RotinaModule],
  providers: [PlantaService],
  controllers: [PlantaController],
})
export class PlantaModule {}
