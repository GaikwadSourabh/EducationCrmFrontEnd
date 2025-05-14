import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-navbar',
  imports: [RouterLink],
  templateUrl: './employee-navbar.component.html',
  styleUrl: './employee-navbar.component.css'
})
export class EmployeeNavbarComponent implements OnInit
{
  constructor(private router :Router){}
  name=''
 ngOnInit(): void {
  this.name = localStorage.getItem('name') || ''

 }

 logout()
 {
  localStorage.clear();
  this.router.navigate(['/employeeLogin']);
 }
}
