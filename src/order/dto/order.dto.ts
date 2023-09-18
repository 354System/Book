import { Product } from "src/Product/schemas/product.schema";

export class CreateOrderDto{
    
    readonly product: Product;

    readonly quantity: number;
    
}