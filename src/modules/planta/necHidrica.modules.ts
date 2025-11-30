
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NecessidadeHidrica } from './necHidrica.entity';
import { NecessidadeHidricaService } from './necHidrica.service';

@Module({
  imports: [TypeOrmModule.forFeature([NecessidadeHidrica])],
  providers: [NecessidadeHidricaService],
  exports: [NecessidadeHidricaService],
})
export class NecessidadeHidricaModule {}
