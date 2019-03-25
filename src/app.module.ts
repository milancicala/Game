import {Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { GameModule } from './modules/game/game.module';
import { ActivityLogModule } from './modules/activity-log/activity-log.module';
import { IpWhitelistMiddleware } from './middleware/ipWhitelist.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';

@Module({
  imports: [GameModule, ActivityLogModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({});
    consumer
        .apply(HelmetMiddleware, IpWhitelistMiddleware)
        .forRoutes('*');
  }
}
