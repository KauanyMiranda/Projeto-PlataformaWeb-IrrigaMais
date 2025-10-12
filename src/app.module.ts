import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlashMiddleware } from './common/middlewares/flash.middleware';
import { PlantaModule } from './modules/planta/planta.modules';
import { LoginModule } from './modules/login/login.modules';
import { WeatherModule } from './weather/weather.module';
import { SensorModule } from './modules/sensor/sensor.modules';

@Module({
  imports: [PlantaModule, LoginModule, WeatherModule, SensorModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FlashMiddleware).forRoutes('*');
  }
}
