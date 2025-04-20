import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../modules/Employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  private API_URL="http://localhost:3000/admin/employee";

  createEmployee(data:Employee):Observable<Employee>
  {
    return this.http.post<Employee>(this.API_URL, data)
  }

  getAllEmployee(page:number=1,limit:number=5):Observable<{ data: Employee[]; total: number; }>
  {
    const params = new HttpParams().set('page',page).set('limit',limit);
    return this.http.get<{ data: Employee[]; total: number; }>(this.API_URL,{params})
  }

  getEmployeeById(id:string):Observable<Employee>
  {
    return this.http.get<Employee>(`${this.API_URL}/${id}`)
  }
  updateEmployee(id:string,data:Employee):Observable<Employee>
  {
    return this.http.put<Employee>(`${this.API_URL}/${id}`,data);
  }

  deleteEmployee(id:string):Observable<Employee>
  {
    return this.http.delete<Employee>(`${this.API_URL}/${id}`)
  }
  
}
