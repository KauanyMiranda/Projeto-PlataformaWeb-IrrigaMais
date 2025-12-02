import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { WeatherService } from './weather/weather.service';
import { PlantaService } from './modules/planta/planta.service';

@Controller()
export class AppController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly plantaService: PlantaService,
  ) {}

  @Get()
  async redirectToLogin(@Req() req: Request, @Res() res: Response) {
    if (req.session.user) {
      return res.redirect('/home');
    }

    return res.redirect('/auth/login');
  }

  @Get('/home')
  async home(@Req() req: Request, @Res() res: Response) {
    if (!req.session.user) {
      return res.redirect('/auth/login');
    }

    const latitude = -10.8777;
    const longitude = -61.9326;

    let clima: any = {};
    let previsao: any[] = [];
    let ultimasPlantas: any[] = [];

    try {
      clima = await this.weatherService.getWeather(latitude, longitude);
      previsao = await this.weatherService.getForecast(latitude, longitude);
      ultimasPlantas = await this.plantaService.getUltimas(3);

      clima.cidade = 'Ji-Paraná';
      clima.estado = 'RO';
      clima.pais = 'Brasil';
    } catch (error) {
      console.error('Erro ao carregar dados da home:', error);
    }

    return res.render('home', {
      title: 'Início - Irriga+',
      clima,
      previsao,
      ultimasPlantas,
      usuario: req.session.user,
    });
  }
}
