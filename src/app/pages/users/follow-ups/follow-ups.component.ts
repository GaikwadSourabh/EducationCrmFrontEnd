import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InquiryService } from '../Services/inquiry.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-follow-ups',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,DatePipe],
  templateUrl: './follow-ups.component.html',
  styleUrl: './follow-ups.component.css'
})
export class FollowUpsComponent implements OnInit{
  successMsg='';
  errormsg=''

  constructor(private inquiryService:InquiryService,private modalService: NgbModal){}
  selectedDate: string = '';
  empEmail=localStorage.getItem('email')
  followUps: any[] = [];
  selectedPhone: string = '';
  inquiries: any[] = [];
  showInquirySection = false;
  showModal = false;
  showFollowUpDate = false;

  ngOnInit()
  {
    const today = new Date().toISOString().split('T')[0];
    this.selectedDate = today;
    this.onDateChange();
  }

  formData: any = {
    empEmail: localStorage.getItem('email') || '',
    phoneno: '',
    name: '',
    interestedCourse: '',
    discussion: '',
    inquiryType: '',
    callType: '',
    status: '',
    followUpDate: ''
  };

    @ViewChild('inquiryModal') inquiryModal!: TemplateRef<any>;
    modalRef?: NgbModalRef;

onDateChange()
{
   if(this.selectedDate&& this.empEmail)
   {
    this.inquiryService.searchFollowUps(this.empEmail, this.selectedDate).subscribe((data: any[]) => {
      this.followUps = data;
      if (this.followUps.length > 0) {
        this.formData.name = data.length > 0 ? data[0].name : '';
        this.formData.phoneno = data.length > 0 ? data[0].phoneno:''
      }

    });

}
}

submitForm()
{

}

getDiscussions(phoneno:string)
{
   this.inquiryService.searchInquiries(phoneno).subscribe((data:any[])=>{
     this.inquiries=data;
     this.formData.name = data.length > 0 ? data[0].name : '';
     console.log("name is", this.formData.name)
     this.showInquirySection=true;
   })
}

openModal() {
  this.modalRef = this.modalService.open(this.inquiryModal);
}

toggleFollowUpDate(event: any) {
  const value = event.target.value;
  this.showFollowUpDate = value === 'Interested - (follow up)';
}

toggleModal() {
  this.showModal = !this.showModal;
}


}
