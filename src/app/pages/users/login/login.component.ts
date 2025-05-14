import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 errorMsg='';
  constructor(private loginService:LoginService,private router:Router){}
  login={email:'',password:''};

  onLogin()
  {
   this.loginService.login(this.login.email,this.login.password).subscribe({
    next:(res)=>{
      alert('Login Saved successfully')
      this.router.navigate(['/user-layout'])
    },error:(err)=>{
      if (err.status === 403 || err.status === 401) {
        this.errorMsg = err.error.message;
      } else {
        this.errorMsg = 'An unexpected error occurred.';
      }
    }
   })

  }
}
