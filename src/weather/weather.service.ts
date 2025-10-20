import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly apiKey = 'b530897f08b4433bc6736eafe8867095';

  constructor(private readonly httpService: HttpService) {}

   async getWeather(lat: number, lon: number) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=pt_br`;

    const { data } = await firstValueFrom(this.httpService.get(url));

    return {
      cidade: data.name,
      pais: data.sys.country,
      descricao: data.weather[0].description,
      icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      temp: Math.round(data.main.temp),
      temp_max: Math.round(data.main.temp_max),
      temp_min: Math.round(data.main.temp_min),
      umidade: data.main.humidity,
      vento: (data.wind.speed * 3.6).toFixed(1),
    };
  }
}
