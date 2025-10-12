import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private apiKey = '1ffeb0b1a9e04699a4c45100251210';
  private city = 'Ji-Parana';

  async getWeather() {
    const url = `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}&lang=pt`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clima:', error.message);
      return null;
    }
  }
}
