import { Component, OnInit, ViewChild } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';
import { ProductsService } from '@core/services/products/products.service';
import { Product } from '@core/services/products/Product';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ActivatedRoute } from '@angular/router';
import { dateGreaterThan, idVerification } from '../validators/product.validator';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule,ModalComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  constructor(
    private productService:ProductsService,
    private route:ActivatedRoute
  ){

  }
  ngOnInit(): void {
    this.checkParams()
    this.updateDateRevisionOnChanges()
  }
  updateDateRevisionOnChanges(){
    this.productForm.controls.date_release.valueChanges.subscribe((value)=>{
      if (!value) {
       return 
      } 
      const releasedate = new Date(value);
      releasedate.setHours(0,0,0,0)
      releasedate.setDate(releasedate.getDate()+1)
      const oneYearAfter = new Date(releasedate);
      oneYearAfter.setFullYear(releasedate.getFullYear() + 1);
      this.productForm.controls.date_revision.setValue(oneYearAfter.toISOString().split("T")[0])
    })
  }
  formMode:'new' |'update' = 'new' 
  checkParams(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id == '0' || !id) {
      // se agregar el validador de fecha mayor a la actual
      this.productForm.controls.date_release.removeValidators(dateGreaterThan(new Date()))
      this.productForm.controls.id.enable()
      return
    }
    this.productService.getOneProduct(id).subscribe((product)=>{
      const data = product
      if (!Object.keys(data).length) {
       return 
      }
      this.productForm.controls.id.setValue(data.id)
      this.productForm.controls.id.disable()
      this.productForm.controls.name.setValue(data.name)
      this.productForm.controls.description.setValue(data.description)
      this.productForm.controls.logo.setValue(data.logo)
      this.productForm.controls.date_release.setValue(data.date_release)
      this.productForm.controls.date_revision.setValue(data.date_revision)
      this.formMode = 'update'
    })
    

    
  }
  @ViewChild('modal') modalComponent!:ModalComponent
  productForm = new FormGroup({
    id: new FormControl(
        '',
      {
        validators:[
          Validators.required,Validators.minLength(3),Validators.maxLength(10),
        ],
        asyncValidators:[idVerification(this.productService)]
      }
    ),
    name: new FormControl('',{validators:[Validators.required,Validators.minLength(6),Validators.maxLength(100)]},),
    description: new FormControl('',{validators:[Validators.required,Validators.minLength(10),Validators.maxLength(200)]}),
    logo: new FormControl('',{validators:[Validators.required]}),
    date_release: new FormControl('',{validators:[Validators.required]}),
    date_revision: new FormControl({value:'',disabled:true}),
  })
  createProductError?:string
  sendingForm:boolean = false
  sendForm(){
    console.log({productForm:this.productForm});
    console.log({idExists:this.productForm.controls.id.hasError('idExists')}) 
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched()
     return 
    }
    this.productForm.controls.id.enable()
    this.productForm.controls.date_revision.enable()
    const product = this.productForm.value as Product
    console.log({product});
    if (this.formMode == 'update') {
      this.productForm.disable()
      this.sendingForm = true
      this.updateProduct(product) 
    }
    if (this.formMode == 'new') {
    this.productForm.disable()
      this.sendingForm = true
     this.createNewProduct(product) 
    }
    
  }


  updateProduct(product:Product){
    this.productService.updateProduct(product).subscribe({
      next:(data)=>{
        this.productForm.enable()
        this.productForm.controls.id.disable()
        this.sendingForm = false
        console.log(data);
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
        this.productForm.enable()
        this.productForm.controls.id.disable()
        this.sendingForm = false
        console.log(error);
        this.createProductError = error.message
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
    })
  }
  createNewProduct(product:Product){
    this.productService.createProduct(product).subscribe({
      next:(data)=>{
        console.log(data);
        this.productForm.enable()
        this.productForm.controls.date_revision.enable()
        this.sendingForm = false
        this.modalComponent.showModal({
          description:data.message,
          buttons:[
            {
              text:"Aceptar",
              onclick:()=>{
                this.productForm.reset()
              },
              class:"reset-btn primary-btn",
            }
          ]
        })
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error);
        this.productForm.enable()
        this.productForm.controls.date_revision.enable()
        this.sendingForm = false
        this.createProductError = error.message
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
    })
  }
}
