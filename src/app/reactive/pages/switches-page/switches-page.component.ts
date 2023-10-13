import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  constructor(private fb: FormBuilder) { }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'

        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracters.`;
      }
    }

    return null;
  }


  onSave(): void {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched();

    console.log(this.myForm.value);

    this.myForm.reset({
      gender: 'M',
      wantNotifications: true,
      termsAndConditions: false
    });

  }
}
