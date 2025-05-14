import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-customer-login',
  imports: [CommonModule,FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {

  constructor(private userService:UsersService,private router:Router){
  }
login={email:'',password:''}
errorMessage=''

onLogin()
{
  this.userService.login(this.login.email,this.login.password).subscribe({
    next: (res) => {
       alert('Loggin Successfully')
      this.router.navigate(['']);
    },
    error: (err) => {
      if (err.status === 403 || err.status === 401) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = 'An unexpected error occurred.';
      }
    }
  })
}
}
