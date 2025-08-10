import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductsListComponent } from './products-list/products-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products-list',
    pathMatch: 'full',
  },
  {
    path: 'product-page/:id',
    component: ProductComponent,
  },
  {
    path: 'products-list',
    component: ProductsListComponent,
  },
];
