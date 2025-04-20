import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employeeForm:FormGroup;


  successMsg=''
  errorMsg=''

  private courseService = inject(EmployeeService);

   constructor(private fb:FormBuilder)
   {
    this.employeeForm = this.fb.group({
      name:[''],
      email:[''],
      password:[''],
      phoneno:[''],
      city:[''],
    });
   }

   onSubmit()
   {
     const employee = {
       name: this.employeeForm.value.name,
       email: this.employeeForm.value.email,
       password: this.employeeForm.value.password,
       phoneno: this.employeeForm.value.phoneno,
       city: this.employeeForm.value.city,
     };

     this.courseService.createEmployee(employee).subscribe((res)=>
     {
        if(res)
        {
          this.successMsg='Employee Added Successfully...'
          this.employeeForm.reset();
        }else{
          this.errorMsg='Employee Not Added Successfully...'
        }
     }
    )
   }

}
