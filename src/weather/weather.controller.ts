import { Controller, Get, Render } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller()
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('/')
  @Render('home') // ou 'menu' se for esse o arquivo HBS
  async showDashboard() {
    const weather = await this.weatherService.getWeather();
    return { weather };
  }
}
