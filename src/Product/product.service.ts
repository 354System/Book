import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import * as Mongoose from 'mongoose';
import { Product } from './schemas/product.schema';
import { Query } from 'express-serve-static-core';
@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private productModel: Mongoose.Model<Product>
    ) { }

    async findAll(query: Query): Promise<Product[]> {


        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i',
            }
        } : {};

        const products = await this.productModel.find({ ...keyword });
        return products;
    }

    async create(product: Product): Promise<Product> {
        const res = await this.productModel.create(product);
        return res;

    }

    async findByTitle(title: string): Promise<Product> {
        return await this.productModel.findOne({ title });;
    }

    async findById(id: string): Promise<Product> {
        const isValidId = Mongoose.isValidObjectId(id)
        if (!isValidId) {
            throw new BadRequestException('id incorrect');
        }


        const product = await this.productModel.findById(id);
        if (!product) {
            throw new NotFoundException('Product Not Found');
        }
        return product;

    }


    async updateById(id: string, product: Product): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(id, product, {
            new: true,
            runValidator: true,
        });


    }

    async deleteById(id: string): Promise<Product> {
        return await this.productModel.findByIdAndDelete(id, {
        });


    }
}
