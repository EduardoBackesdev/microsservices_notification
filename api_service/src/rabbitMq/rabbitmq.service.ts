import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { SendEmailMQ } from "src/dto/data/sendEmailMQ";


@Injectable()
export class RabbitMQService implements OnModuleInit {
    private client: ClientProxy;

    onModuleInit() {
        this.client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
            urls: ['amqps://vjxuhnkb:N22_7zvU4T083bseFb8K6ggJhQhm7-wt@whale.rmq.cloudamqp.com/vjxuhnkb'],
            queue: 'email_queue',
            queueOptions: { durable: true },
        },
        });
    }

    publish(data: SendEmailMQ){
        this.client.emit('user.created', data)
    }

}