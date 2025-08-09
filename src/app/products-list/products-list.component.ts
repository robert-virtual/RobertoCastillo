import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  constructor(private router: Router) {}
  results: number = 5;

  data = [
    {
      logo: 'logo',
      productName: 'Nombre del producto',
      description: 'Descripción',
      releaseDate: 'Fecha de liberación',
      remakeDate: 'Fecha de reestructuración',
    },
    {
      logo: 'logo',
      productName: 'Nombre del producto',
      description: 'Descripción',
      releaseDate: 'Fecha de liberación',
      remakeDate: 'Fecha de reestructuración',
    },
    {
      logo: 'logo',
      productName: 'Nombre del producto',
      description: 'Descripción',
      releaseDate: 'Fecha de liberación',
      remakeDate: 'Fecha de reestructuración',
    },
    {
      logo: 'logo',
      productName: 'Nombre del producto',
      description: 'Descripción',
      releaseDate: 'Fecha de liberación',
      remakeDate: 'Fecha de reestructuración',
    },
    {
      logo: 'logo',
      productName: 'Nombre del producto',
      description: 'Descripción',
      releaseDate: 'Fecha de liberación',
      remakeDate: 'Fecha de reestructuración',
    },
    {
      logo: 'logo',
      productName: 'Nombre del producto',
      description: 'Descripción',
      releaseDate: 'Fecha de liberación',
      remakeDate: 'Fecha de reestructuración',
    },
  ];
  viewProduct(reg: any) {
    this.router.navigate(['/product', reg]);
  }
}
