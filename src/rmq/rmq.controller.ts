import { Controller, Get, Post } from '@nestjs/common';
import { RabbitMQService } from './rmq.service';

@Controller('queue')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('send')
  async sendRabbitMQMessage() {
    await this.rabbitMQService.connect();
    await this.rabbitMQService.sendMessage('testing-queue', 'Hello, RabbitMQ!');
    // await this.rabbitMQService.closeConnection();
    return 'Message sent to RabbitMQ';
  }
  
  
}