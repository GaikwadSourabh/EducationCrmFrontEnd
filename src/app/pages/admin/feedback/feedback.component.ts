import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminNavBarComponent } from '../../../component/admin/admin-nav-bar/admin-nav-bar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Feedback } from '../modules/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import Modal from 'bootstrap/js/dist/modal';
import { Course } from '../modules/course.model';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,DatePipe],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent
{
  feedback:Feedback[]=[];
  selectedFeedback:any=null;

  totalPageArray:number[]=[];
  pagination={hasPrevious:false,hasNext:false};
  showModel:boolean=true;

    courses:Course[]=[];
    page: number = 1;
    limit:number = 5;
    totalCourses:number = 0;

  constructor(private feedbackService:FeedbackService){}

  ngOnInit()
  {
    this.fetchFeedback();
  }

  fetchFeedback()
  {
    this.feedbackService.findAll(this.page,this.limit).subscribe((res:any)=>{
      this.feedback=res.data;
      this.totalCourses=res.total;
    });
  }

  onPageChange(newPage:number)
  {
    this.page=newPage;
    this.fetchFeedback();
  }

  totalPages():number[]{
    return Array(Math.ceil(this.totalCourses/this.limit)).fill(0).map((_, i)=> i+1);
  }

  openModal(feedback:any)
  {
    this.selectedFeedback=feedback;
  }

  markStatus(status:'true'|'false')
  {
    if(!this.selectedFeedback)return;

    this.feedbackService.updateStatus(this.selectedFeedback._id,status).subscribe((data)=>{
      this.fetchFeedback();
      this.showModel=false;
    })
  }
}
