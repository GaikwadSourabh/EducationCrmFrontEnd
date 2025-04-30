import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminNavBarComponent } from '../../../component/admin/admin-nav-bar/admin-nav-bar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Feedback } from '../modules/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import Modal from 'bootstrap/js/dist/modal';

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
  currentPage:number=0;
  pageSize:number=5;
  totalPageArray:number[]=[];
  pagination={hasPrevious:false,hasNext:false};
  showModel:boolean=true;

  constructor(private feedbackService:FeedbackService){}

  ngOnInit()
  {
    this.fetchFeedback();
  }

  fetchFeedback()
  {
    this.feedbackService.findAll(this.currentPage,this.pageSize).subscribe((res:any)=>{
      this.feedback=res.data;
      this.totalPageArray=Array.from({length:res.totalPages},(_,i)=>i);
      this.pagination={
        hasPrevious:res.number > 0,
        hasNext:res.number < res.totalPages-1
      };
    });
  }

  changePage(page:number)
  {
    this.currentPage=page;
    this.fetchFeedback();
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
