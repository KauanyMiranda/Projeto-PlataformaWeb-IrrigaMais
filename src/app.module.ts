import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlashMiddleware } from './common/middlewares/flash.middleware';
import { ChamadoModule } from './modules/chamado/chamado.modules';
import { LoginModule } from './modules/login/login.modules';

@Module({
  imports: [ChamadoModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FlashMiddleware).forRoutes('*');
  }
}
