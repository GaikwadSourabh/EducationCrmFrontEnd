import { Component, OnInit } from '@angular/core';
import { AdminNavBarComponent } from '../../../component/admin/admin-nav-bar/admin-nav-bar.component';
import { UserService } from '../services/user.service';
import { Users } from '../modules/users.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-management',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './customer-management.component.html',
  styleUrl: './customer-management.component.css'
})
export class CustomerManagementComponent implements OnInit
{
  users:Users[]=[];
  UserFound:boolean=true
  constructor(private userService:UserService){}
  page:number=1;
  limit:number=5;
  totalCourses:number = 0;

  successMsg=''
  errorMsg=''

  ngOnInit(): void {
     this.getAll()
  }

  onPageChange(newPage:number)
  {
    this.page=newPage;
    this.getAll()
  }

  getAll()
  {
    this.userService.finadAll(this.page,this.limit).subscribe((res)=>{
       this.users=res.data
       this.totalCourses=res.total;
       if(res)
       {
        this.UserFound=false;
       }
    })
  }

  totalPages():number[]{
    return Array(Math.ceil(this.totalCourses/this.limit)).fill(0).map((_, i)=> i+1);
  }

ban:boolean=true

  banUser(id: string) {
    if (confirm('Are you sure you want to ban this user?')) {
      this.userService.updateStatus(id, 'true').subscribe((data) => {

          this.successMsg="User Ban Successfully";

        this.getAll();
      });
    }
  }

  unbanUser(id: string) {
    if (confirm('Are you sure you want to unban this user?')) {
      this.userService.updateStatus(id, 'false').subscribe((data) => {

          this.errorMsg="User UnBan Successfully";

        this.getAll();
      });
    }
  }

}
