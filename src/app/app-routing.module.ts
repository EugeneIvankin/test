import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPageComponent } from "./products-page/products-page.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsPageComponent,
    data: {
      type: "main",
    },
  },
  {
    path: "category/:id",
    component: ProductsPageComponent,
    data: {
      type: "category",
    },
  },
  {
    path: "basket",
    component: ProductsPageComponent,
    data: {
      type: "basket",
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
