import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardModule } from './dashboard/dashboard.module';
import { RequestLoggerMiddleware } from './logs/request-logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todoapp'),
    HomeModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // This applies the CSV logger to every route in your application
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}