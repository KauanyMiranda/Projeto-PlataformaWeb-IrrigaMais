import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from "./app.service"
import { title } from 'process';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  home() {
    return {
      title: 'Início - Irriga+',
      css: '/css/home.css'
    }
  }
}
