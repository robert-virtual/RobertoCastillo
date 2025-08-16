import { Routes } from '@angular/router';
import { ProductComponent } from './features/products/product/product.component';
import { ProductsListComponent } from './features/products/products-list/products-list.component';

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
