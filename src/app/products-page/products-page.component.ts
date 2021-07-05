import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

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
export class ProductsPageComponent implements OnDestroy {
  public products: (Product | undefined)[] = [];
  public pageTypes: typeof PageTypes = PageTypes;
  public pageType: string = '';
  public categoryId: number = 0;
  public title: string = '';
  public until$ = new Subject();

  constructor(
    public service: ProductService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    router.events.pipe(takeUntil(this.until$)).subscribe((val) => {
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

  public ngOnDestroy(): void {
    this.until$.next();
    this.until$.complete();
  }
}
