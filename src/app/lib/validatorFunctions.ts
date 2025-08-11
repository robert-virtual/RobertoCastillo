import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { catchError, debounceTime, map, Observable, of, take } from "rxjs";
import { ProductsService } from "../services/products.service";


export function idVerification(productService:ProductsService):AsyncValidatorFn{
    return (control:AbstractControl):(Observable<ValidationErrors|null>)=>{
    if (!control.value) {
      console.log("idverification null value");
     return of(null)
    }
    console.log("idverification  good value");
     return productService.idVerification(control.value) 
        .pipe(
          debounceTime(500),
          take(1),
          map(idExist=> {
            console.log({idExist})
            return (idExist ? {idExist:true} : null)
          }),
          catchError(idVerificationError=>{
            console.log({idVerificationError})
            return of(idVerificationError)
          })

        ) 

    }
}

export function dateGreaterThan(date: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlDate = new Date(control.value);
    date.setHours(0,0,0,0) 
    if (!control.value) {
      return null; 
    }
    controlDate.setHours(0,0,0,0)
    controlDate.setDate(controlDate.getDate()+1)
    console.log({controlDate,date})
    return controlDate.getDate() >= date.getDate() ? null : { dateInvalid: true };
  };
}

export function dateExactlyOneYearAfter(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control.parent
    if (!form) {
     return null 
    }
    const date = new Date(form.get('date_release')?.value);
    date.setDate(date.getDate()+1)
    const controlDate = new Date(control.value);
    controlDate.setDate(controlDate.getDate()+1)
    controlDate.setHours(0,0,0,0)
    date.setHours(0,0,0,0) 
    if (!control.value) {
      return null; 
    }
    const oneYearLater = date
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    oneYearLater.setHours(0,0,0,0)
    console.log({date,controlDate,oneYearLater})

    return controlDate.getTime() === oneYearLater.getTime() ? null : { dateInvalid: true };
  };
}