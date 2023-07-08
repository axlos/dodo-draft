import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function wordLimitValidator(limit: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const words = control.value.split(' ');
    if (words.length <= limit) {
      return null;
    }

    return { wordLimit: true };
  };
}
