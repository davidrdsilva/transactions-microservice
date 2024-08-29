import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessagingService } from '../services/rabbitmq.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RABBITMQ_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'transaction_queue',
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    providers: [MessagingService],
    exports: [MessagingService],
})
export class MessagingModule {}
