import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellsService {

  private API_URL="http://localhost:3000/sales-info";

  constructor(private http:HttpClient) { }

  getTotalSalesAllEmployee():Observable<number>
  {
    return this.http.get<number>(`${this.API_URL}/total`)
  }

  getEachEmpSales():Observable<any[]>
  {
    return this.http.get<any[]>(`${this.API_URL}/by-employee`)
  }


}
