import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CustomerManagementComponent } from './pages/admin/customer-management/customer-management.component';
import { CourseMamagementComponent } from './pages/admin/course-mamagement/course-mamagement.component';
import { EmployeeManagementComponent } from './pages/admin/employee-management/employee-management.component';
import { FeedbackComponent } from './pages/admin/feedback/feedback.component';
import { SalesComponent } from './pages/admin/sales/sales.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/users/login/login.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { UserLayoutComponent } from './pages/users/user-layout/user-layout.component';
import { MyProfileComponent } from './pages/users/my-profile/my-profile.component';
import { SellCourseComponent } from './pages/users/sell-course/sell-course.component';
import { InquiryManagementComponent } from './pages/users/inquiry-management/inquiry-management.component';
import { FollowUpsComponent } from './pages/users/follow-ups/follow-ups.component';
import { AddCourseComponent } from './pages/admin/add-course/add-course.component';
import { AddEmployeeComponent } from './pages/admin/add-employee/add-employee.component';
import { EditCourseComponent } from './pages/admin/edit-course/edit-course.component';
import { EditEmployeeComponent } from './pages/admin/edit-employee/edit-employee.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'adminLogin',component:AdminLoginComponent},
  { path: 'admin-layout',
    component:AdminLayoutComponent,
    children:[
      { path: 'dashboard',component:DashboardComponent},
      { path: 'customer-management',component:CustomerManagementComponent},
      { path: 'course-management',component:CourseMamagementComponent},
      { path: 'employee-management',component:EmployeeManagementComponent},
      { path: 'feedback',component:FeedbackComponent},
      { path: 'sales',component:SalesComponent},
      { path: 'add-course',component:AddCourseComponent},
      { path: 'add-employee',component:AddEmployeeComponent},
      { path: 'edit-course/:id',component:EditCourseComponent},
      { path: 'edit-employee/:id',component:EditEmployeeComponent}
    ]
  },
  { path: 'employeeLogin',component:LoginComponent},
  { path: 'employeeRegister',component:RegisterComponent},
  { path: 'user-layout',
    component:UserLayoutComponent,
    children:[
      { path: 'my-profile',component:MyProfileComponent},
      { path: 'sell-course',component:SellCourseComponent},
      { path: 'inquiry-management',component:InquiryManagementComponent},
      { path: 'follow-ups',component:FollowUpsComponent},
    ]
  }

];
