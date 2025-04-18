import { Component } from '@angular/core';
import { EmployeeNavbarComponent } from '../../../component/employee/employee-navbar/employee-navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [EmployeeNavbarComponent,RouterModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
