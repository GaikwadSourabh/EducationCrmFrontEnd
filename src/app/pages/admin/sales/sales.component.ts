import { Component, OnInit } from '@angular/core';
import { AdminNavBarComponent } from '../../../component/admin/admin-nav-bar/admin-nav-bar.component';
import { SellsService } from '../services/sells.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{

  constructor(private sellsService:SellsService){}
  totalSales:number=0;
  employee:any[]=[];

  ngOnInit(): void
  {
    this.getAllSales();
    this.getEachEmployeeSales();
  }

  getAllSales()
  {
     this.sellsService.getTotalSalesAllEmployee().subscribe((data)=>{
         this.totalSales=data;
     })
  }

  getEachEmployeeSales()
  {
    this.sellsService.getEachEmpSales().subscribe(data=>{
     this.employee=data;
    })
  }

}
