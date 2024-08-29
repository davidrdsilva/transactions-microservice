import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessagingService {
    constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

    // Send a message to the RabbitMQ queue
    async sendMessage(pattern: string, message: any) {
        this.client.emit(pattern, message);
    }
}
