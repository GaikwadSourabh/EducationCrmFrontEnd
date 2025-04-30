import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../admin/services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../admin/modules/course.model';
import { SellService } from '../Services/sell.service';

@Component({
  selector: 'app-sell-course',
  imports: [CommonModule,FormsModule],
  templateUrl: './sell-course.component.html',
  styleUrl: './sell-course.component.css'
})
export class SellCourseComponent implements OnInit
{

  courses:Course[]=[];
  successMsg = '';
  errorMsg = '';

  emp_email: string | null = null;

  constructor(private courseService:CourseService,private sellService:SellService){}
  ngOnInit(): void {
    this.emp_email = localStorage.getItem('email');
    this.getCourses()

  }
  getCourses() {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data
    });
  }

  formData = {
    course_name: '',
    course_amount: 0,
    user_email: '',
    payment_id: '',
    order_id: 'ORD-' + Math.floor(Math.random() * 100000)
  };

  onSellCourse()
  {
    this.formData.course_amount = Number(this.formData.course_amount);
    this.sellService.create(this.formData, this.emp_email || '').subscribe((data)=>{
      if(data)
      {
        this.successMsg="Course Provide Successfully"
      }else{
        this.errorMsg="Course Not Provided Successfully"
      }
    })
  }
}
