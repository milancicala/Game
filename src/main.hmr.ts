// dependencies
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// config
const config = require('./config/config.json');

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
