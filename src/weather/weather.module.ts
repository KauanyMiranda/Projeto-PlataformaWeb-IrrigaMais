import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({
  imports: [HttpModule],
  providers: [WeatherService],
  controllers: [WeatherController], // 🔹 Adicione o controller aqui
  exports: [WeatherService],
  
})
export class WeatherModule {}
