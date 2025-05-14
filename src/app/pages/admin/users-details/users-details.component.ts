import { Component, OnInit } from '@angular/core';
import { SellService } from '../../users/Services/sell.service';
import { Purchase } from '../../users/modules/purchase.modules';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../modules/course.model';

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  providers: [DatePipe] ,
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.css'
})
export class UsersDetailsComponent implements OnInit
{
  courseDetails: any[] = [];
  email:string=''
  name:string=''
  course: Course | null = null;
  constructor(private sellService:SellService,private route:ActivatedRoute,private courseService:CourseService){}

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {

      this.email = params.get('email') || '';
      this.name = params.get('name') || '';
    })
    this.getAllDetails(this.email)

  }

  getAllDetails(email:string)
  {
    return this.sellService.getUsersEmailDetails(email).subscribe((data)=>{
        this.courseDetails=data;

         this.courseDetails.forEach((course: any) => {
         this.courseService.getImageByName(course.course_name).subscribe((imgData: Course) => {
         course.image = imgData.image;

      });
    })
  })
  }
}
