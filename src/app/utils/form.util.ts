import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';

export function markGroupDirty(formGroup: FormGroup, isPristine?: boolean) {
  Object.keys(formGroup.controls).forEach((key: string) => {
    switch (formGroup.get(key)?.constructor.name) {
      case "FormGroup":
        markGroupDirty(formGroup.get(key) as FormGroup, isPristine);
        break;
      case "FormArray":
        markArrayDirty(formGroup.get(key) as FormArray, isPristine);
        break;
      case "FormControl":
        markControlDirty(formGroup.get(key) as FormControl, isPristine);
        break;
    }
  });
}

export function markArrayDirty(formArray: FormArray, isPristine?: boolean) {
  formArray.controls.forEach((control: AbstractControl) => {
    switch (control.constructor.name) {
      case "FormGroup":
        markGroupDirty(control as FormGroup, isPristine);
        break;
      case "FormArray":
        markArrayDirty(control as FormArray, isPristine);
        break;
      case "FormControl":
        markControlDirty(control as FormControl, isPristine);
        break;
    }
   });
}

export function markControlDirty(formControl: FormControl, isPristine?: boolean) {
  if(isPristine){
    formControl.markAsPristine();
  } else {
    formControl.markAsDirty();
  }
}