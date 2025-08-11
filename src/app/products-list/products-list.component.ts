import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../types/Product';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { ContextMenuComponent } from "../context-menu/context-menu.component";
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalComponent, ContextMenuComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  constructor(
    private router: Router,
    private productsService:ProductsService
  ) {}

  products?:Product[]
  productsSearch?:Product[]
  productsRequestError?: string
  itemsPerPage: number = 5;


  ngOnInit(): void {
   this.loadProducts() 
  }
  _search :string = ''
  get search(){
    return this._search
  }
  set search(value){
    console.log({search:value});
    
    this._search = value
    this.productsSearch = this.products?.filter(p=>(
        p.id.toLowerCase().includes(this._search.toLocaleLowerCase()) ||
        p.name.toLowerCase().includes(this._search.toLocaleLowerCase()) ||
        p.description.toLowerCase().includes(this._search.toLocaleLowerCase())
    ))
  }
  loadingProducts: boolean = false
  loadProducts(){
    this.loadingProducts = true
    this.productsService.getProducts().subscribe({
      next:({data})=>{
        this.products = data
        this.productsSearch = data
        this.loadingProducts = false
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error);
        this.loadingProducts = false
        this.productsRequestError = error.message
      }
    })
  }
  selectedProduct?: Product

  @ViewChild('contextMenu') contextMenuComponent!: ContextMenuComponent

  showContextMenu(event:MouseEvent,product:Product){
    event.stopPropagation()
    this.contextMenuComponent.showContextMenu(event)

    this.selectedProduct = product
    console.log({selectedProduct:this.selectedProduct});
    
    console.log({event,product});
  }

  viewProduct(id: string = '0') {
    console.log({selectedProduct:id});
    this.router.navigate(['/product-page',id]);
  }
  updateProduct(){
    this.viewProduct(this.selectedProduct?.id)
  }
  @ViewChild('modal') modalComponent!:ModalComponent

  deleteProduct(){
    console.log("deleteProduct");
    this.modalComponent.showModal({
      description:`¿Estas seguro de eliminar el producto <b>${this.selectedProduct?.name}</b>?`,
      buttons:[
        {
          text:"Cancelar",
          class:"reset-btn secondary-btn",
          onclick() {
            
          },
        },
        {
          text:"Confirmar",
          class:"reset-btn primary-btn",
          onclick:()=> {
            if (!this.selectedProduct) {
              return
            }
            this.productsService.deleteProduct(this.selectedProduct.id).subscribe(
              {
                next:(data)=>{
                  console.log(data);
                  this.loadProducts()
                  this.modalComponent.showModal({
                    description:data.message,
                    buttons:[
                      {
                        text:"Aceptar",
                        onclick(){

                        },
                        class:"reset-btn primary-btn",
                      }
                    ]
                  })
                },
                error:(error:HttpErrorResponse)=>{
                  console.log(error);
                  this.modalComponent.showModal({
                    description:error.message,
                    buttons:[
                      {
                        text:"Aceptar",
                        onclick(){

                        },
                        class:"reset-btn secondary-btn",
                      }
                    ]
                  })
                }
              }
            )
          },
        }
      ]
    })
  }
}
