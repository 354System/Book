import { Module } from "@nestjs/common";
import { RabbitMQService } from "./rmq.service";
import { RabbitMQController } from "./rmq.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
              name: 'MATH_SERVICE',
              transport: Transport.RMQ,
              options: {
                urls: ['amqp://localhost:5672'],
                queue: 'products_queue',
                queueOptions: {
                  durable: false
                },
              },
            },
          ]),
    ],
    controllers: [RabbitMQController],
    providers: [RabbitMQService],
    exports:[RabbitMQService],

})
export class RmqModule {}