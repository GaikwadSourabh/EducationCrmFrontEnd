import { Component, OnInit } from '@angular/core';
import { AdminNavBarComponent } from '../../../component/admin/admin-nav-bar/admin-nav-bar.component';
import { RouterModule } from '@angular/router';
import { Employee } from '../modules/Employee.model';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-management',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.css'
})
export class EmployeeManagementComponent implements OnInit
{
   employee:Employee[]=[];
   page:number=1;
   limit:number=5;
   totalEmployee:number=0;

   successMsg='';
   errorMsg='';

   constructor(private employeeService:EmployeeService){}

  ngOnInit(): void {
   this.getEmployee()
  }

  getEmployee()
  {
     this.employeeService.getAllEmployee(this.page,this.limit).subscribe((res)=>{
      this.employee=res.data;
      this.totalEmployee=res.total;
     })
  }
  totalPages(): number[] {
    return Array(Math.ceil(this.totalEmployee / this.limit))
      .fill(0)
      .map((_, i) => i + 1);
  }
  onPageChange(newPage:number)
  {
     this.page=newPage;
     this.getEmployee();
  }

  onDelete(id:string)
  {
    this.employeeService.deleteEmployee(id).subscribe((res)=>{
      if(res)
      {
         this.successMsg='Employee Deleted Succesfully';
      }else{
        this.errorMsg='Employee Not Deleted Successfully';
      }
    })
  }


}
