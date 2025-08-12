import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../types/BaseResponse';
import { CreateProductRes, Product } from '../types/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private http:HttpClient) { }

  deleteProduct(id:string){
    return this.http.delete<CreateProductRes>(`/bp/products/${id}`,{headers:{'Accept':'application/json'}})
  }
  updateProduct(product:Product){
    return this.http.put<CreateProductRes>(`/bp/products/${product.id}`,{...product,id:undefined},{headers:{'Accept':'application/json'}})
  }
  createProduct(product:Product){
    return this.http.post<CreateProductRes>('/bp/products',product,{headers:{'Accept':'application/json'}})
  }

  idVerification(id:string){
    return this.http.get<boolean>(`/bp/products/verification/${id}`)
  }
  getOneProduct(id:string){
    return this.http.get<Product>(`/bp/products/${id}`,{headers:{'Accept':'application/json'}})
  }
  getProducts(){
    return this.http.get<BaseResponse<Product[]>>('/bp/products',{headers:{'Accept':'application/json'}})
  }
}
