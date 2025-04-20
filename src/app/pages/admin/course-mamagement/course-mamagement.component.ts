import { Component } from '@angular/core';
import { AdminNavBarComponent } from '../../../component/admin/admin-nav-bar/admin-nav-bar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Course } from '../modules/course.model';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-mamagement',
  imports: [RouterModule,CommonModule],
  templateUrl: './course-mamagement.component.html',
  styleUrl: './course-mamagement.component.css'
})
export class CourseMamagementComponent {
  courses:Course[]=[];
  page: number = 1;
  limit:number = 5;
  totalCourses:number = 0;

  successMsg='';
  errorMsg='';

  constructor(private courseService:CourseService){}

  ngOnInit()
  {
    this.loadCourses()
  }

  loadCourses()
  {
    this.courseService.getCourses(this.page,this.limit).subscribe((res)=>{
      this.courses=res.data;
      this.totalCourses=res.total;
    });
  }

  onPageChange(newPage:number)
  {
    this.page=newPage;
    this.loadCourses();
  }

  totalPages():number[]{
    return Array(Math.ceil(this.totalCourses/this.limit)).fill(0).map((_, i)=> i+1);
  }


  onDelete(id:string)
  {
    const confirmed = confirm('Are you sure you want to delete this course?');

    if(!confirmed)
    {
      return
    }

     this.courseService.deleteCourse(id).subscribe((res)=>{

      if(res)
      {
          this.successMsg="Course deleted Successfully.."
      }else{
        this.errorMsg="Course not deleted Successfully.."
      }
     })
  }
}
