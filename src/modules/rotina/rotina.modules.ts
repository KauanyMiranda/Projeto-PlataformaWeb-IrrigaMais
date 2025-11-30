import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RotinaController } from './rotina.controller';
import { RotinaService } from './rotina.service';
import { OldMiddleware } from 'src/common/middlewares/old.middleware';

@Module({
  controllers: [RotinaController],
  providers: [RotinaService],
  exports: [RotinaService],
})
export class RotinaModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OldMiddleware)
      .forRoutes({ path: 'rotina/*', method: RequestMethod.ALL });
  }
}
