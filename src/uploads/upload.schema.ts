import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema({
    timestamps:true,
})
export class Upload{
    
    @Prop()
    url: string;

}

export const UploadSchema = SchemaFactory.createForClass(Upload)