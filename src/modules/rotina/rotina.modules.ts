import { Module } from '@nestjs/common';
import { RotinaController } from '../rotina/rotina.controller';
import { RotinaService } from './rotina.service';

@Module({
    imports: [],
    controllers: [RotinaController],
    providers: [RotinaService],
    exports: [RotinaService]
})
export class RotinaModule { }