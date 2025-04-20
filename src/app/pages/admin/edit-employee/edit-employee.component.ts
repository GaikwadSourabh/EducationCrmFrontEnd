import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit{

  employeeForm!:FormGroup;
  employeeData:any=null;


constructor(private route:ActivatedRoute,private employeeService:EmployeeService,private fb:FormBuilder,private router:Router){}
ngOnInit(): void {
   this.employeeForm=this.fb.group({
    name:[''],
    email:[''],
    password:[''],
    city:[''],
    phoneno:['']
   })

  const employeeId = this.route.snapshot.paramMap.get('id');

  if(employeeId)
  {
    this.employeeService.getEmployeeById(employeeId).subscribe((data)=>{
      this.employeeData=data;
      this.employeeForm.patchValue({
        name:data.name,
        email:data.email,
        password:data.password,
        city:data.city,
        phoneno:data.phoneno
      });
    });
  }
}

onSubmit()
{
  if(this.employeeForm.valid)
  {
    const formData = new FormData();
    formData.append('name',this.employeeForm.get('name')?.value);
    formData.append('email',this.employeeForm.get('email')?.value);
    formData.append('password',this.employeeForm.get('password')?.value);
    formData.append('city',this.employeeForm.get('city')?.value);
    formData.append('phoneno',this.employeeForm.get('phoneno')?.value);

    const employeeId=this.route.snapshot.paramMap.get('id');
    this.employeeService.updateEmployee(employeeId!,this.employeeForm.value).subscribe((res)=>{
      alert('employee updated Successfully');
      this.router.navigate(['/admin-layout/employee-management'])
    })
  }
}
}
