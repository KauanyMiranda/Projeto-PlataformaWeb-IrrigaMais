import { Controller, Get, Render, Query } from '@nestjs/common';
import { AppService } from "./app.service"
import { title } from 'process';
import { WeatherService } from './weather/weather.service';

@Controller()
export class AppController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @Render('home')
  async home(@Query('lat') lat?: string, @Query('lon') lon?: string) {
    const latitude = lat ? parseFloat(lat) : -10.8753;
    const longitude = lon ? parseFloat(lon) : -61.9521;

    const clima = await this.weatherService.getWeather(latitude, longitude);
    return { title: 'Início - Irriga+', clima };
  }
}
