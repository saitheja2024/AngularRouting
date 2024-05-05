import { ValidationErrors, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        let emptyObj = {};
        return emptyObj;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? {} : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.value; // get password from our password form control
    const confirmPassword: string = control.value; // get password from our confirmPassword form control
    // compare is the password math
    return password !== confirmPassword;
      // if they don't match, set an error in our confirmPassword form control
      //control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    
  }

  static zhipCodeValidator (control: AbstractControl) {
    const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/; // regex for US zip code format
    const isValid = zipCodeRegex.test(control.value);
    return isValid ? null : { 'usZipCode': true };
  }
}

export function createEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}$/.test(value);

    return !email ? { emailValidation: true } : null;
  };
}

export function nameValidator(): ValidatorFn {
  return (control:AbstractControl): ValidationErrors | null =>{
    const value = control.value;
    if(!value){
      return null;
    }
    const name= /^[a-zA-Z]*$/.test(value);

    return !name ? {nameValidation:true} : null;
  }
}

export function newPasswordValidator(password: string, newPassword: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup?.controls?.[password];
    let matchingControl = formGroup?.controls?.[newPassword]
    if (
      matchingControl?.errors &&
      !matchingControl?.errors['newPasswordValidator']
    ) {
      return;
    }
    if (control?.value === matchingControl?.value) {
      matchingControl?.setErrors({ newPasswordValidator: true });
    } else {
      matchingControl?.setErrors(null);
    }
  };
}

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    
    if (control.value && !phoneNumberPattern.test(control.value)) {
      return { 'phoneNumberInvalid': true };
    }
    
    return null;
  };
}