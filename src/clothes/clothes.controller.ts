import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, } from '@nestjs/common';
import {ClothesService } from './clothes.service';
import { Clothes } from './schemas/clothes.schema';
import { CreateClothesDto } from '../clothes/dto/create-clothes.dto';
import { UpdateClothesDto } from '../clothes/dto/update-clothes.dto';
import { Query as ExpressQuery} from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('clothes')
export class BookController {
    constructor(private clothesService: ClothesService) { }

    @Get()
    async getAllClothes(@Query()  query: ExpressQuery,@Param('id') id: string): Promise<Clothes[]> {
        return this.clothesService.findAll(query)
    }

    @Post()
    @UseGuards(AuthGuard())
    async createClothes(
        @Body()
        clothes: CreateClothesDto
    ): Promise<Clothes>{
        const findbook = await this.clothesService.findByTitle(clothes.title)
        if (findbook) {
            throw new BadRequestException('brand already exist');
        }
        return this.clothesService.create(clothes)
    }

    @Get(':id')
    async getClothes(
        @Param('id')
        id: string
    ): Promise<Clothes> {
        return this.clothesService.findById(id);

    }

    @Put(':id')
    async updateClothes(
        @Param('id')
        id: string,
        @Body()
        clothes: UpdateClothesDto
    ): Promise<Clothes> {
        return this.clothesService.updateById(id, clothes,);
    }


    @Delete(':id')
    async deleteClothes(
        @Param('id')
        id: string
    ): Promise<Clothes> {
        return this.clothesService.deleteById(id);
    }

    
}
