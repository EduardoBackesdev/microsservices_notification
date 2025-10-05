import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { connect, Connection, Channel } from 'amqplib';
import { SendEmailMQ } from "src/dto/data/sendEmailMQ";

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {

    private connection: any
    private channel: any
    private readonly queueName = 'email_queue'

    async onModuleInit() {
        try {
            // Account created with plataform "https://www.cloudamqp.com",
            // Create your account and put in connect('put here your link of connection')
            this.connection = await connect('amqps://vjxuhnkb:N22_7zvU4T083bseFb8K6ggJhQhm7-wt@whale.rmq.cloudamqp.com/vjxuhnkb')
            this.channel = await this.connection.createChannel()
            await this.channel.assertQueue(this.queueName, {durable: true})
            console.log("Connected")
        } catch (error) {
            throw error
        }
    }

    async onModuleDestroy() {
        if (this.channel){
            await this.channel.close()
        }
        if (this.connection){
            await this.connection.close()
        }
        console.log("Connection closed!")
    }

    async publish(m: SendEmailMQ){
        if(!this.channel){
            throw new Error("Channel not open!")
        }
        const buffer = Buffer.from(JSON.stringify(m))
        this.channel.sendToQueue(this.queueName, buffer, {persistent: true})
        console.log("Message in queue!")
    }

}