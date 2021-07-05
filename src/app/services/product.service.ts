import { Injectable } from "@angular/core";

import { Product, Category } from "../models";

@Injectable()
export class ProductService {
  public getAllProducts(): Product[] {
    return [
      {
        "id": 1,
        "name": "Product #1",
        "category": 1,
        "price": 100
      },
      {
        "id": 2,
        "name": "Product #2",
        "category": 1,
        "price": 150
      },
      {
        "id": 3,
        "name": "Product #3",
        "category": 2,
        "price": 600
      },
      {
        "id": 4,
        "name": "Product #4",
        "category": 2,
        "price": 1000
      }
    ]
  }

  public getAllCategories(): Category[] {
    return [
      {
        "id": 1,
        "name": "Category #1",
      },
      {
        "id": 2,
        "name": "Category #2",
      }
    ]
  }

  public addProduct(id: number): void {
    const selectedProductsIds = this.getSelectedProductsIds() ? this.getSelectedProductsIds() : [];

    selectedProductsIds.push(id);

    localStorage.setItem('selectedProducts', JSON.stringify(selectedProductsIds));
  }

  public getSelectedProductsIds(): number[] {
    return JSON.parse(<string>localStorage.getItem('selectedProducts'));
  }

  public getSelectedProducts(): (Product | undefined)[] {
    const selectedProductsIds = this.getSelectedProductsIds() ? this.getSelectedProductsIds() : [];

    return selectedProductsIds.map((id: number) => this.getAllProducts().find((product: Product) => product.id === id));
  }

  public getProductsByCategory(id: number): Product[] {
    return this.getAllProducts().filter((product: Product) => product.category === id);
  }
}
