import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";



export enum Category{
    MAN = 'Man',
    WOMAN = 'Woman',
}


@Schema({
    timestamps:true,
})
export class Clothes{
    
    @Prop()
    title: string;
    
    @Prop()
    price: boolean;
    
    @Prop()
    description: string;
    
    @Prop()
    category: Category;

    @Prop()
    image: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'User'})
    user?: User;
}

export const ClothesSchema = SchemaFactory.createForClass(Clothes)