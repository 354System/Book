import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import * as Mongoose from 'mongoose';
import { Clothes } from './schemas/clothes.schema';
import { Query } from 'express-serve-static-core';
@Injectable()
export class ClothesService {
    constructor(
        @InjectModel(Clothes.name)
        private clothesModel: Mongoose.Model<Clothes>
    ) { }

    async findAll(query: Query): Promise<Clothes[]> {


        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i',
            }
        } : {};

        const clothes = await this.clothesModel.find({ ...keyword });
        return clothes;
    }

    async create(clothes: Clothes): Promise<Clothes> {
        const res = await this.clothesModel.create(clothes);
        return res;

    }

    async findByTitle(title: string): Promise<Clothes> {
        return await this.clothesModel.findOne({ title });;
    }

    async findById(id: string): Promise<Clothes> {
        const isValidId = Mongoose.isValidObjectId(id)
        if (!isValidId) {
            throw new BadRequestException('id incorrect');
        }


        const clothes = await this.clothesModel.findById(id);
        if (!clothes) {
            throw new NotFoundException('Clothes Not Found');
        }
        return clothes;

    }


    async updateById(id: string, clothes: Clothes): Promise<Clothes> {
        return await this.clothesModel.findByIdAndUpdate(id, clothes, {
            new: true,
            runValidator: true,
        });


    }

    async deleteById(id: string): Promise<Clothes> {
        return await this.clothesModel.findByIdAndDelete(id, {
        });


    }
}
