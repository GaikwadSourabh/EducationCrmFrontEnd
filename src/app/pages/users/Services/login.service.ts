import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL="http://localhost:3000/employee-auth/login";

  constructor(private http:HttpClient){}

  login(email:string,password:string)
  {
     return this.http.post<{access_token:string,employee:any}>(this.API_URL,{email,password}).pipe(tap(response=>{
      localStorage.setItem('token',response.access_token);
      localStorage.setItem('name',response.employee.name);
      localStorage.setItem('email',response.employee.email);
      localStorage.setItem('phoneno',response.employee.phoneno);
      localStorage.setItem('city',response.employee.city);
     }))
  }
}
