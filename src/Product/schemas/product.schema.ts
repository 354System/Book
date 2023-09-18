import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";



export enum Category {
    OTOMOTIF = 'Otomotif',
    PERTUKANGAN = 'Pertukangan',
    FASHION_PRIA = 'Fashion Pria',
    KESEHATAN = 'Kesehatan',
    PERLENGKAPAN_PESTAdanCRAFT = 'Perlengkapan Pesta & Craft',
    ELEKTRONIK = 'Elektronik',
    OFFICEandSTATIONERY = 'Office & Stationery',
    HANDPHONEdanTABLET = 'Handphone & Tablet',
    RUMAH_TANGGA = 'Rumah Tangga',
    BUKU = 'Buku',
    DAPUR = 'Dapur',
    FASHION_ANAKdanBAYI = 'Fashion Anak & Bayi',
}


@Schema({
    timestamps: true,
})
export class Product {

    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    @Prop()
    category: Category;

    @Prop()
    image: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user?: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product)