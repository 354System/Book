import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel:Model<Order>){}

        async create(createOrderDto:CreateOrderDto):Promise<Order>{
            const createdOrder = new this.orderModel(createOrderDto);
            return createdOrder.save();
        }

        async findAll():Promise<Order[]>{
            return this.orderModel.find().exec();
        }
}
