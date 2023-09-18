import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



@Schema()
export class Order extends Document {
  @Prop()
  product: string;

  @Prop()
  quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
