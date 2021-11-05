import { Inject, Injectable } from "@nestjs/common";
import { OrderModel } from "src/core-domain/models/order.model";
import { IBaseService } from "src/core-domain/application-service/base.service";
import { HttpClient } from "src/infrastructure/client/http.client";


@Injectable()
export default class FetchOrderService implements IBaseService<number, OrderModel> {
    constructor(private httpclient: HttpClient) {
        console.log('FetchOrderService created')
    }

    async handle(): Promise<OrderModel[]> {
        const responseObject = await this.httpclient.get('all');
        return responseObject;
    }
}