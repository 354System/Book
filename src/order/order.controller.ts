   // order.controller.ts
   import { Controller, Post, Get, Body } from '@nestjs/common';
   import { OrderService } from './order.service';
   import { CreateOrderDto } from './dto/order.dto';

   @Controller('orders')
   export class OrderController {
     constructor(private readonly orderService: OrderService) {}

     @Post()
     async create(@Body() createOrderDto: CreateOrderDto) {
       return this.orderService.create(createOrderDto);
     }

     @Get()
     async getProduct(orderDto:CreateOrderDto) {
        console.log(orderDto)
       return this.orderService.findAll();
     }
   }