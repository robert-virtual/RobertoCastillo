import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { provideHttpClient } from '@angular/common/http';
import { Product } from './Product';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        ProductsService
      ]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create a product', () => {
    const newProduct = {id:"123",name:"product",description:"description",logo:"logo",date_release:"01/01/2025",date_revision:"01/01/2026"} as Product
    service.createProduct(newProduct).subscribe(({data})=>{
        expect(data).toBe(newProduct)
    })
  });

  it('should get products', () => {
    service.getProducts().subscribe((products)=>{
        expect(products.length).toBeGreaterThanOrEqual(0)
    })
  });

  it('should update a product', () => {
    const product = {id:"123",name:"product",description:"description",logo:"logo",date_release:"01/01/2025",date_revision:"01/01/2026"} as Product
    service.updateProduct(product).subscribe(({data})=>{
        expect(data).toBe(product)
    })
  });
  
  it('should delete a product', () => {
    const product = {id:"123",name:"product",description:"description",logo:"logo",date_release:"01/01/2025",date_revision:"01/01/2026"} as Product
    service.deleteProduct("123").subscribe(({data})=>{
        expect(data).toBe(product)
    })
  });

});
