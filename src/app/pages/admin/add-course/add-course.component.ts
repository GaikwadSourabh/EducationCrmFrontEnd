import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  providers: [CourseService],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {

   courseForm:FormGroup;
   selectedImage:File|null=null;

   successMsg=''
   errorMsg=''

   private courseService = inject(CourseService);

   constructor(private fb:FormBuilder)
   {
    this.courseForm = this.fb.group({
      name:[''],
      description:[''],
      originalPrice:[''],
      discountPrice:[''],
      updatedOn:[''],
    });
   }

   onImageSelected(event:any)
   {
    this.selectedImage=event.target.files[0];

   }

   onSubmit()
   {
     const formData=new FormData();
     formData.append('name',this.courseForm.value.name);
     formData.append('description',this.courseForm.value.description);
     formData.append('originalPrice',this.courseForm.value.originalPrice);
     formData.append('discountPrice',this.courseForm.value.discountPrice);
     formData.append('updatedOn',this.courseForm.value.updatedOn);
     if(this.selectedImage)
     {
       formData.append('image',this.selectedImage);
     }

     this.courseService.createCourse(formData).subscribe((res)=>
     {
        if(res)
        {
          this.successMsg='Course Added Successfully...'
          this.courseForm.reset();
        }else{
          this.errorMsg='Course Not Added Successfully...'
        }
     }
    )
   }
  }


