import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlashMiddleware } from './common/middlewares/flash.middleware';
import { PlantaModule } from './modules/planta/planta.modules';
import { UsuarioModule } from './modules/usuario/usuario.modules';
import { WeatherModule } from './weather/weather.module';
import { SensorModule } from './modules/sensor/sensor.modules';
import { RotinaModule } from './modules/rotina/rotina.modules';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    DatabaseModule, 
    PlantaModule, 
    UsuarioModule, 
    WeatherModule, 
    SensorModule,
    RotinaModule,
    AuthModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FlashMiddleware).forRoutes('*');
  }
}
