import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import FetchOrderService from "src/core-domain/application-service/fetchorder.service";
import { WinstonLoggerService } from "src/infrastructure/logger/winston-logger.service";


@Controller()
export class OrderController {
    constructor(
        private fetchOrderService: FetchOrderService,
        private logger: WinstonLoggerService,) {
        this.logger.setContext(OrderController.name);
        console.log('orders service controller created')
    }

    @Get('/all')
    fetchOrders() {
        this.logger.info('in fetchMasterData info', { key: 'value' });
        this.logger.error('in fetchMasterData error', { key: 'value' });
        this.logger.debug('in fetchMasterData debug', { key: 'value' });
        this.logger.warn('in fetchMasterData warn');
        console.log('orders service controller fetchOrders method')
        //throw new HttpException("err string", HttpStatus.FORBIDDEN);
        return this.fetchOrderService.handle()
    }
}