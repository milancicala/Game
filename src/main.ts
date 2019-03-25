// dependencies
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mung from 'express-mung';
import * as hpp from 'hpp';
// middleware
import logger from '../src/handler/logger';
// config
const config = require('./config/config.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    /**
     * Application setup
     */
    app.disable('x-powered-by');
    app.use(hpp({})); // protection against HTTP Parameter Pollution attacks
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
        next();
    });

    /**
     * Activity logger middleware
     */
    app.use((req, res, next) => {
        res.on('finish', () => {
            let response;

            app.use(mung.json(
                function transform(body) {
                    response = body;
                },
            ));

            res.body = response;
            logger(req, res);
        });
        next();
    });

  await app.listen(config.port);
}
bootstrap();
