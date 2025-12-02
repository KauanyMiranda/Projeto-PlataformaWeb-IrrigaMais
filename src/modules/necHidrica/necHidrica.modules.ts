import { Module } from '@nestjs/common';
import { NecHidricaService } from './necHidrica.service';

@Module({
  imports: [],
  controllers: [],
  providers: [NecHidricaService],
  exports: [NecHidricaService]
})
export class NecHidricaModule {}