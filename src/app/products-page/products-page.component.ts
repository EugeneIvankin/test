import { Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

import { PageTypes, Product } from "../models";
import { ProductService } from "../services/product.service";

enum TitleValues {
  BASKET = 'Products in basket',
  CATEGORY = 'Products On Category',
  MAIN = 'All Products'
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {
  public products: (Product | undefined)[] = [];
  public pageTypes: typeof PageTypes = PageTypes;
  public pageType: string = '';
  public categoryId: number = 0;
  public title: string = '';

  constructor(
    public service: ProductService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.pageType = this.route.snapshot.data['type'];
        this.categoryId = +route.snapshot.params.id;

        this.loadProducts();
      }
    });
  }

  public loadProducts() {
    if (this.pageType === this.pageTypes.BASKET) {
      this.products = this.service.getSelectedProducts();
      this.title = TitleValues.BASKET
    } else if (this.pageType === this.pageTypes.CATEGORY) {
      this.products = this.service.getProductsByCategory(this.categoryId);
      this.title = TitleValues.CATEGORY
    }
    else {
      this.products = this.service.getAllProducts();
      this.title = TitleValues.MAIN
    }
  }

  public addProduct(id: number | undefined) {
    if (id) {
      this.service.addProduct(id)
    }
  }
}
