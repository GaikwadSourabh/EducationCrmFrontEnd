import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InquiryService } from '../Services/inquiry.service';

@Component({
  selector: 'app-add-inquiry',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-inquiry.component.html',
  styleUrl: './add-inquiry.component.css'
})
export class AddInquiryComponent {

  showFollowUpDate = false;

  constructor(private inquiryService:InquiryService){}

  successMsg='';
  errorMsg='';

  formData :any = {
    name:'',
    phoneno:'',
    interestedCourse:'',
    discussion:'',
    inquiryType:'',
    callType:'',
    status:'',
    followUpDate:''

  }

  submitForm() {

    const queryParams:any={};

    if(this.formData.followUpDate)
    {
      queryParams.followUpDate=this.formData.followUpDate;
    }


    this.inquiryService.submitInquiry(this.formData,queryParams).subscribe({
      next: () => {
        this.successMsg = 'Inquiry added successfully';
        ;
      },
      error: () => {
        this.errorMsg = 'Failed to submit inquiry';
      }
    });
  }

  toggleFollowUpDate()
  {
    this.showFollowUpDate = this.formData.status === 'Interested - (follow up)';
  }

}
