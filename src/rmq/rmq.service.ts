import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async connect() {
    this.connection = await amqp.connect('amqp://localhost:5672'); // Replace with your RabbitMQ server URL
    this.channel = await this.connection.createChannel();
  }

  async sendMessage(queueName: string, message: string) {
if (!this.channel) {
  this.connect();
}
    this.channel.sendToQueue(queueName, Buffer.from(message));
    await this.channel.assertQueue(queueName, { durable: false });

    console.log(`The message ${message} is sent to exchange ${queueName}`);
  }

  async closeConnection() {
    await this.channel.close();
    await this.connection.close();
  }

  
}