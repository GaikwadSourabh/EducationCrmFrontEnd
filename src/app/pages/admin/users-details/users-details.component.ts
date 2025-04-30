import { Component, OnInit } from '@angular/core';
import { SellService } from '../../users/Services/sell.service';
import { Purchase } from '../../users/modules/purchase.modules';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  providers: [DatePipe] ,
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.css'
})
export class UsersDetailsComponent implements OnInit
{
  courseDetails: any[] = [];
  email:string=''
  name:string=''

  constructor(private sellService:SellService,private route:ActivatedRoute){}

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {

      this.email = params.get('email') || '';
      this.name = params.get('name') || '';
    })
    this.getAllDetails(this.email)

  }

  getAllDetails(email:string)
  {
    return this.sellService.getUsersEmailDetails(email).subscribe((data)=>{
        this.courseDetails=data;
    })
  }
}
