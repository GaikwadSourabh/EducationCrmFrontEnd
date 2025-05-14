import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackPageComponent implements OnInit {
  successMsg='';
  errorMsg='';

  feedbackForm!: FormGroup;
  name=localStorage.getItem('name') || '';
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService:UsersService
  ) {}

  ngOnInit(): void {
    const name = isPlatformBrowser(this.platformId) ? localStorage.getItem('name') : '';
    const email = isPlatformBrowser(this.platformId) ? localStorage.getItem('email') : '';

    this.feedbackForm = this.fb.group({
      user_name: [name, Validators.required],
      user_email: [email, [Validators.required, Validators.email]],
      user_feedback: ['', Validators.required]
    });
  }


  onSubmit()
  {

    const feedback = this.feedbackForm.value;
    this.userService.feedback(feedback).subscribe((data)=>{
      if(data)
      {
        this.successMsg='feedback send Successfully'
      }else{
        this.errorMsg='feedback not send Successfully'
      }
    })
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate([' ']);
  }
}
