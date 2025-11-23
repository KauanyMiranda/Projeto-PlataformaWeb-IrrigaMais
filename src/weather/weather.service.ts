import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly apiKey = 'b530897f08b4433bc6736eafe8867095';

  constructor(private readonly httpService: HttpService) {}

  // 🌡️ CLIMA ATUAL
  async getWeather(lat: number, lon: number) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=pt_br`;
    const { data } = await firstValueFrom(this.httpService.get(url));

    return {
      cidade: data.name,
      estado: "",
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

  // 🌤️ PREVISÃO DOS PRÓXIMOS DIAS
  async getForecast(lat: number, lon: number) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=pt_br`;

    const { data } = await firstValueFrom(this.httpService.get(url));

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    // pega apenas o horário das 12:00 (um por dia)
    const previsoes = data.list
      .filter((item: any) => item.dt_txt.includes("12:00:00"))
      .map((item: any) => {
        const dataObj = new Date(item.dt * 1000);

        return {
          diaSemana: diasSemana[dataObj.getDay()],
          dataFormatada: `${dataObj.getDate()}/${dataObj.getMonth() + 1}`,
          descricao: item.weather[0].description,
          icone: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          temp: Math.round(item.main.temp),
          temp_min: Math.round(item.main.temp_min),
          temp_max: Math.round(item.main.temp_max),
          porcent_chuva: Math.round(item.pop * 100), // <- porcentagem de chuva aqui!
        };
      });

    return previsoes;
  }
}
