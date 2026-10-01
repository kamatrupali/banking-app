import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../core/services/user';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [ReactiveFormsModule, MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {

  private fb = inject(FormBuilder);

  private userService = inject(User);

  registerForm = this.fb.group({
    firstName:['',[Validators.required,Validators.minLength(2)]],
    lastName:['',[Validators.required,Validators.minLength(2)]],
    email:['',[Validators.required,Validators.email]],
    phoneNumber:['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
    password:['',[Validators.required,Validators.minLength(8)]]

  })

  onSubmit(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload = {
      firstName: this.registerForm.value.firstName ?? '',
      lastName: this.registerForm.value.lastName ?? '',
      email: this.registerForm.value.email ?? '',
      phoneNumber: this.registerForm.value.phoneNumber ?? '',
      password: this.registerForm.value.password ?? ''
    };

    this.userService.registerUser(payload).subscribe({
      next:response => {
        console.log("User Registered",response);
        alert("User Registration Successful");
        this.registerForm.reset();
      },
      error: error => {
        console.error(error);
        alert("Registration Failed");
      }
    })
  }
}
