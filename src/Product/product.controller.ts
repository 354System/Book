import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    async getAllProducts(@Query() query: ExpressQuery, @Param('id') id: string): Promise<Product[]> {
        return this.productService.findAll(query)
    }

    @Post()
    @UseGuards(AuthGuard())
    async createProduct(
        @Body()
        product: CreateProductDto
    ): Promise<Product> {
        const findproduct = await this.productService.findByTitle(product.title)
        if (findproduct) {
            throw new BadRequestException('title already exist');
        }
        return this.productService.create(product)
    }

    @Get(':id')
    async getProduct(
        @Param('id')
        id: string
    ): Promise<Product> {
        return this.productService.findById(id);

    }

    @Put(':id')
    async updateProduct(
        @Param('id')
        id: string,
        @Body()
        product: UpdateProductDto
    ): Promise<Product> {
        return this.productService.updateById(id, product,);
    }


    @Delete(':id')
    async deleteproduct(
        @Param('id')
        id: string
    ): Promise<Product> {
        return this.productService.deleteById(id);
    }


}
