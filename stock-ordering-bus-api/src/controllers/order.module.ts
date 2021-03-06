import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { HttpClient } from 'src/infrastructure/client/http.client';
import { TypeOrmModule } from '@nestjs/typeorm';
import FetchOrderService from 'src/core-domain/application-service/fetchorder.service';
import { OrderController } from './order.controller';
import { ConfigService } from 'src/infrastructure/configuration/config.service';
import { WinstonLoggerModule } from 'src/infrastructure/logger/winston.logger.module';

@Module({
    imports: [
        HttpModule,
        WinstonLoggerModule.forRoot({ level: ConfigService.create().getLogLevel() }),
    ],
    controllers: [OrderController],
    providers: [
        FetchOrderService,
        HttpClient
    ],
})
export class OrderModule {
    constructor() {
        console.log('OrderModule created')
    }
};