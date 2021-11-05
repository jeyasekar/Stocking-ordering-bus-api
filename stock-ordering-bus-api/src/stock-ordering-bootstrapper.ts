import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from './infrastructure/configuration/config.service';
import { OrderModule } from './controllers/order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule)
  var port = ConfigService.create().getPort();
  console.log(port);
  await app.listen(port)
 
}
bootstrap();
