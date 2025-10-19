import { Controller, Get, Query, Render } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @Render('weather')
  async showWeather(@Query('lat') lat: string, @Query('lon') lon: string) {
    // Se não houver lat/lon, usa uma localização padrão (ex: Ji-Paraná)
    const latitude = parseFloat(lat) || -10.8753;
    const longitude = parseFloat(lon) || -61.9521;

    const clima = await this.weatherService.getWeather(latitude, longitude);
    return { title: 'Clima Atual', clima };
  }
}

