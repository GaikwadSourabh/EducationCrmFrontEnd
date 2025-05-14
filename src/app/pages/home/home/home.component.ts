import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../admin/services/course.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../modules/course.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UsersService } from '../services/users.service';

declare var Razorpay: any;
@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  providers:[DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  sessionUser: { email: string; name: string; phoneno: string } = { email: '', name: '', phoneno: '' };
  purchasedCourseNameList: string[] = [];
  emp_email=''
  email = localStorage.getItem('email') || '';
  name = localStorage.getItem('name')||'';
  constructor(private courseService:CourseService,private http:HttpClient,private router:Router,private userService:UsersService){}
  courses:Course[]=[];

  ngOnInit(): void
  {
    this.getAllPurchaseCourse(),
    this.getAllCourses()

   }

   getAllPurchaseCourse()
   {
    this.userService.getPurchasedCourse(this.email).subscribe((data: any[]) => {
      this.purchasedCourseNameList = data.map(course => course.course_name);
      console.log("Purchased course ",this.purchasedCourseNameList)
    })
  }

  getAllCourses()
  {
      this.courseService.getAllCourses().subscribe((data:Course[])=>{
      this.courses=data
    })
  }

  purchaseCourse(course: any) {
    const options = {
      key: 'rzp_test_75FetP9FeXVnCv',
      amount: course.discountPrice * 100,
      currency: 'INR',
      name: 'Smart Programming',
      description: 'Course Transaction',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO67FwD9X8RUcz06z5OZto0lNs4QqwOKTcFA&s',
      handler: (response: any) => {

        const requestData = {
          course_name: course.name,
          course_amount: course.discountPrice,
          payment_id: response.razorpay_payment_id,
          user_email: localStorage.getItem('email'),
          order_id: 'RAZ-' + Math.floor(Math.random() * 100000)
        };

        this.http.post('http://localhost:3000/purchase',requestData).subscribe((data)=>{
          console.log("purchase data",data)
        });
      },
      prefill: {
        name: this.sessionUser?.name ?? '',
        email: this.sessionUser?.email ?? '',
        contact: this.sessionUser?.phoneno ?? ''
      },
      notes: {
        courseName: course.name
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', (response: any) => {
      console.error(response);
      alert('Payment failed');
    });

    rzp1.open();
  }

  logout()
  {
    localStorage.clear();
    window.location.href = '/';   }

}
