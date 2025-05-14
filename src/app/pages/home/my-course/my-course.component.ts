import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Course } from '../../admin/modules/course.model';
import { CourseService } from '../../admin/services/course.service';

@Component({
  selector: 'app-my-course',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  providers:[DatePipe],
  templateUrl: './my-course.component.html',
  styleUrl: './my-course.component.css'
})
export class MyCourseComponent implements OnInit{
  courses:any[]=[];
  email = localStorage.getItem('email') || '';
  name = localStorage.getItem('name') || '';
  constructor(private router:Router,private userSrrvice:UsersService,private courseService:CourseService){}


  ngOnInit(): void
  {
    this.getAllPurchaseCourse();
  }

  getAllPurchaseCourse()
  {
   this.userSrrvice.getPurchasedCourse(this.email).subscribe((data: any[]) => {
    this.courses = data;
    this.courses.forEach((course: any) => {
             this.courseService.getImageByName(course.course_name).subscribe((imgData: Course) => {
             course.image = imgData.image;
             course.description=imgData.description;
       });
      });
    });
  }

  logout()
  {
    localStorage.clear();
    window.location.href = '/';

  }

}
