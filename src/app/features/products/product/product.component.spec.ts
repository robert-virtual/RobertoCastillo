import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingHarness} from '@angular/router/testing';

import { ProductComponent } from './product.component';
import { provideHttpClient } from '@angular/common/http';
import {  provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../core/services/products/Product';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let service: ProductsService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ProductComponent,
        ReactiveFormsModule,
      ],
      providers:[
        provideHttpClient(),
        ProductsService,
        provideRouter([
          {path:'product-page/:id',component:ProductComponent}
        ])
      ]
    })
    service = TestBed.inject(ProductsService);
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let randomId = Math.round(100+Math.random()*100).toString()
  let randomMonth = Math.round(Math.random()*11)
  const product = {id:randomId,name:"Test Product " + randomId,description:"test description " + randomId,logo:"Test logo " + randomId,date_release:new Date(1,randomMonth,2025).toLocaleDateString(),date_revision:new Date(1,randomMonth,2026).toLocaleDateString()} as Product

  it('should display product id from route parameters', () => {
    service.createProduct(product).subscribe(async()=>{
        const harness = await RouterTestingHarness.create()
        await harness.navigateByUrl('/product-page/'+randomId,ProductComponent)
        let elementValue = harness.routeNativeElement?.querySelector<HTMLInputElement>('input#productId')?.value
        console.log({elementValue,productId:product.id});
        expect(elementValue).toBe(product.id);
    })
  });
  
  it('should display product name fetched', () => {
    service.createProduct(product).subscribe(async({data})=>{
        const harness = await RouterTestingHarness.create()
        await harness.navigateByUrl('/product-page/'+randomId,ProductComponent)
        expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('input#productName')?.value).toBe(product.name);
    })
  });

  it('should display product description fetched', () => {
    service.createProduct(product).subscribe(async({data})=>{
        const harness = await RouterTestingHarness.create()
        await harness.navigateByUrl('/product-page/'+randomId,ProductComponent)
        expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('input#productDescription')?.value).toBe(product.description);
    })
  });

  it('should display product logo fetched', () => {
    service.createProduct(product).subscribe(async({data})=>{
        const harness = await RouterTestingHarness.create()
        await harness.navigateByUrl('/product-page/'+randomId,ProductComponent)
        expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('input#productLogo')?.value).toBe(product.logo);
    })
  });

  it('should display product logo fetched', () => {
    service.createProduct(product).subscribe(async({data})=>{
        const harness = await RouterTestingHarness.create()
        await harness.navigateByUrl('/product-page/'+randomId,ProductComponent)
        expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('input#productLogo')?.value).toBe(product.logo);
    })
  });

  it('should display product date_release fetched', () => {
    service.createProduct(product).subscribe(async({data})=>{
        const harness = await RouterTestingHarness.create()
        await harness.navigateByUrl('/product-page/'+randomId,ProductComponent)
        expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('input#productReleaseDate')?.value).toBe(product.date_release);
    })
  });
  
  it('should display product date_revision fetched', () => {
    service.createProduct(product).subscribe(async({data})=>{
        const harness = await RouterTestingHarness.create()
        await harness.navigateByUrl('/product-page/'+randomId,ProductComponent)
        expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('input#productReleaseDate')?.value).toBe(product.date_release);
    })
  });

});
