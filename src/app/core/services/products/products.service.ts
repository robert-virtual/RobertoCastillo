import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../../types/BaseResponse';
import { CreateProductRes, Product } from './Product';
import { BehaviorSubject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public productsSubject = new BehaviorSubject<Product[]>([])
  public products$ = this. productsSubject.asObservable();

  constructor(private http:HttpClient) { 
    this.loadProducts()
  }

  deleteProduct(id:string){
    return this.http.delete<CreateProductRes>(
      `/bp/products/${id}`,
      {headers:{'Accept':'application/json'}}
    ).pipe(
      tap(()=>{
        const currentProducts = this.productsSubject.value.filter(p=>p.id != id)
        this.productsSubject.next(currentProducts)
      })
    )
  }
  updateProduct(updateProduct:Product){
    return this.http.put<CreateProductRes>(
      `/bp/products/${updateProduct.id}`,
      {...updateProduct,id:undefined},
      {headers:{'Accept':'application/json'}}
    ).pipe(
      tap(()=>{
        const currentProducts = this.productsSubject.value.map(
          prod => prod.id == updateProduct.id ? updateProduct:prod
        )
        this.productsSubject.next(currentProducts)
      })
    )
  }
  createProduct(product:Product){
    return this.http.post<CreateProductRes>('/bp/products',product,{headers:{'Accept':'application/json'}})
    .pipe(
      tap(res=>{
        if (res.data) {
          const currentProducts = this.productsSubject.value
          this.productsSubject.next([...currentProducts,res.data])
        }
      })
    )
  }

  idVerification(id:string){
    return this.http.get<boolean>(`/bp/products/verification/${id}`)
  }
  getOneProduct(id:string){
    return this.http.get<Product>(`/bp/products/${id}`,{headers:{'Accept':'application/json'}})
  }
  loadProducts(){
    this.http.get<BaseResponse<Product[]>>('/bp/products',{headers:{'Accept':'application/json'}})
    .pipe(
      tap(res=>this.productsSubject.next(res.data))
    ).subscribe()
  }
  getProducts(){
    return this.products$
  }
}
