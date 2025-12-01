import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as flash from 'express-flash';
import * as session from 'express-session';
import * as methodOverride from 'method-override';
import * as exphbs from 'express-handlebars';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';
import { helpers } from './common/helpers/hbs-functions';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  // Body do formulário
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const hbs = exphbs.create({
    extname: '.hbs',
    layoutsDir: join(__dirname, '..', 'src/views/_layouts'),
    partialsDir: join(__dirname, '..', 'src/views/_partials'),
    defaultLayout: 'main',
    helpers,
  });

  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.engine('.hbs', hbs.engine);
  app.setViewEngine('hbs');

  app.useStaticAssets(join(__dirname, '..', 'public'));

  // ⚠️ ORDEM IMPORTANTE: session → flash → methodOverride
  app.use(
    session({
      name: 'irriga.sid',
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(flash());
  app.use(methodOverride('_method'));

  app.useGlobalFilters(new NotFoundExceptionFilter());

  const port = process.env.PORT || 3333;
  await app.listen(port, () =>
    Logger.log(`Server running on port ${port}`, 'Bootstrap'),
  );
}

void bootstrap();
