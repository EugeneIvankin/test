import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ProductService } from "../services/product.service";
import { Category } from "../models";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: []
})
export class SidebarComponent implements OnInit {
  public categories: Category[] = [];

  constructor(public service: ProductService, private router: Router) {
  }

  public ngOnInit(): void {
    this.categories = this.service.getAllCategories();
  }

  public selectCategory(id: number) {
    this.router.navigate([`category/${id}`]).then();
  }
}
