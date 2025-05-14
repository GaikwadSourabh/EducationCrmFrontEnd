import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../modules/user.model';

@Component({
  selector: 'app-customer-registeration',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './customer-registeration.component.html',
  styleUrl: './customer-registeration.component.css'
})
export class CustomerRegisterationComponent {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,private userService:UsersService,private router:Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      city: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid)
      {
        const user: User = this.registrationForm.value;
        this.userService.createRegistration(user).subscribe((data)=>{
        alert('Registration successful!');
        this.registrationForm.reset();
        this.router.navigate(['/customerLogin']);
        })
      } else
       {
         this.registrationForm.markAllAsTouched();
       }
  }
}
