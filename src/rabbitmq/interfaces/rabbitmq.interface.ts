export interface RabbitMQConfig {
    urls: string[];
    queue: string;
    queueOptions?: {
        durable: boolean;
    };
}

export interface RabbitMQClientInterface {
    sendMessage(pattern: any, data: any): Promise<any>;
}
