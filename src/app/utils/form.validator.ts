import { AbstractControl, ValidationErrors, ValidatorFn, Validators, FormGroup } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const isMoreThanEight = value.length >= 8;
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && isMoreThanEight;
    return !passwordValid ? { passwordStrength: true } : null;
  };
}

export function createEmailPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    if (typeof Number(value) === 'number' && !isNaN(Number(value))) {
      const phoneNumber = /^[6-9]\d{9}$/.test(value);
      return !phoneNumber ? { emailPhoneValidation: true } : null;
    }

    const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}$/.test(value);
    return !email ? { emailPhoneValidation: true } : null;
  };
}

export function confirmPasswordValidator(password: string, retypePassword: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup?.controls?.[password];
    let matchingControl = formGroup?.controls?.[retypePassword]
    if (
      matchingControl?.errors &&
      !matchingControl?.errors['confirmPasswordValidator']
    ) {
      return;
    }
    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl?.setErrors(null);
    }
  };
}

export function newPasswordValidator(oldPassword: string, password: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup?.controls?.[oldPassword];
    let matchingControl = formGroup?.controls?.[password]
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

export function checkValidateUniqueEmail(authenticationService: AuthenticationService) {
  return (control: AbstractControl): ValidationErrors | null => {
    return authenticationService.validateEmail(control.value).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      take(1),
      map((res: any) => {
        return !res.status ? { invalidateUniqueEmail: true } : null;
      })
    );
  };
}

export function checkValidateUniquePhone(authenticationService: AuthenticationService) {
  return (control: AbstractControl): ValidationErrors | null => {
    return authenticationService.validatePhone(control.value).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      take(1),
      map((res: any) => {
        return !res.status ? { invalidateUniquePhone: true } : null;
      })
    );
  };
}