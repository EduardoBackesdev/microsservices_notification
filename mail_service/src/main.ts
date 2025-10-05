import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://vjxuhnkb:N22_7zvU4T083bseFb8K6ggJhQhm7-wt@whale.rmq.cloudamqp.com/vjxuhnkb'],
      queue: 'email_queue',
      queueOptions: {
        durable: false
      }
    }
  });
  await app.listen();
}
bootstrap();
