import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private API_URL='http://localhost:3000/dashbord';

  constructor(private http:HttpClient) { }

  getCourseAmountTotalSales():Observable<any[]>
  {
     return this.http.get<any[]>(`${this.API_URL}/total-sales-amount`)
  }

  getCoursesTotalSales():Observable<any[]>
  {
    return this.http.get<any[]>(`${this.API_URL}/total-course-sold`)
  }

  getCourseSoldPerDay():Observable<any[]>
  {
    return this.http.get<any[]>(`${this.API_URL}/sold-per-day`)
  }

}
