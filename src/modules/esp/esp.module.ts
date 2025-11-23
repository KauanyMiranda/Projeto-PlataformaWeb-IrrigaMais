import { Module } from '@nestjs/common';
import { EspController } from './esp.controller';
import { EspService } from './esp.service';

@Module({
  controllers: [EspController],
  providers: [EspService],
})
export class EspModule {}
