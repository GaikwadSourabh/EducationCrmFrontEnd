import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InquiryService } from '../Services/inquiry.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inquiry-management',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './inquiry-management.component.html',
  styleUrl: './inquiry-management.component.css'
})
export class InquiryManagementComponent implements OnInit{

  searchPhoneNumber = '';
  customerName = '';
  inquiries: any[] = [];
  successMsg = '';
  errorMsg = '';
  showCustomerInfo = false;
  showFollowUpDate = false;
  showPlusButton = false;
  showAddInquiry=false;

ngOnInit(): void {
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

  constructor(private inquiryService: InquiryService, private modalService: NgbModal) {}


  searchInquiry() {
    this.inquiryService.searchInquiries(this.searchPhoneNumber).subscribe({
      next: (response: any[]) => {
        console.log(response)
        this.inquiries = response;
        this.showCustomerInfo = response.length > 0;
        this.customerName = response.length > 0 ? response[0].name : 'No customer found';
        this.showPlusButton = response.length > 0;
        if (response.length > 0) {
          this.formData.phoneno = this.searchPhoneNumber;
          this.formData.name = this.customerName;
        }else{
          this.showAddInquiry=true;
          this.errorMsg = 'Inquiry Not found Add Neq Inquiry.';

        }
      },
      error: (err: any) => {
        this.errorMsg = 'Inquiry Not found.';
      }
    });
  }

  openModal() {
    this.modalRef = this.modalService.open(this.inquiryModal);
  }

  toggleFollowUpDate() {
    this.showFollowUpDate = this.formData.status === 'Interested - (follow up)';
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
        this.modalRef?.close();
        this.searchInquiry();
      },
      error: () => {
        this.errorMsg = 'Failed to submit inquiry';
      }
    });
  }
}



