import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-course',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit {

  courseForm!:FormGroup;
  courseData: any = null;
  selectedImage:File|null=null;

  constructor(private route:ActivatedRoute,private courseService:CourseService,private fb:FormBuilder,private router:Router){

  }



ngOnInit(): void {
    this.courseForm=this.fb.group({
      name:[''],
      description:[''],
      originalPrice:[''],
      discountPrice:[''],
      updatedOn:[''],
    })

    const courseId = this.route.snapshot.paramMap.get('id');
    if(courseId)
    {
      this.courseService.getCourseById(courseId).subscribe((data)=>{
        this.courseData=data;
        this.courseForm.patchValue({
          name:data.name,
          description:data.description,
          originalPrice:data.originalPrice,
          discountPrice:data.discountPrice,
          updatedOn:data.updatedOn,
        });
      });
    }
}

onImageSelected(event:Event)
{
  const file=(event.target as HTMLInputElement).files?.[0];
  if(file)
  {
    this.selectedImage=file;
  }
}

onSubmit()
{
  if(this.courseForm.valid)
  {
    const formData = new FormData();
    formData.append('name',this.courseForm.get('name')?.value);
    formData.append('description',this.courseForm.get('description')?.value);
    formData.append('originalPrice',this.courseForm.get('originalPrice')?.value);
    formData.append('discountPrice',this.courseForm.get('discountPrice')?.value);
    formData.append('updatedOn',this.courseForm.get('updatedOn')?.value);

    if(this.selectedImage)
    {
      formData.append('image',this.selectedImage);
    }

    const courseId=this.route.snapshot.paramMap.get('id');
    this.courseService.updateCourse(courseId!, this.courseForm.value).subscribe((res)=>{
      alert('Course updated Successfully');
      this.router.navigate(['/admin-layout/course-management'])
    })
  }
}

}
