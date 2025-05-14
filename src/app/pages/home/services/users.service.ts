import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modules/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API_URL="http://localhost:3000";

  constructor(private http:HttpClient) { }

  createRegistration(data:User):Observable<User>
  {
   return this.http.post<User>(`${this.API_URL}/users`,data)
  }

  login(email:string,password:string)
    {
       return this.http.post<{access_token:string,user:any}>(`${this.API_URL}/userAuth/login`,{email,password}).pipe(tap(response=>{
        localStorage.setItem('token',response.access_token);
        localStorage.setItem('name',response.user.name);
        localStorage.setItem('email',response.user.email);
        localStorage.setItem('phonene',response.user.phoneno);
       }))
    }

    feedback(data:any)
    {
      return this.http.post(`${this.API_URL}/feedback`,data)
    }

    getPurchasedCourse(email: string):Observable<any[]>
    {
       const params= new HttpParams().set('email', email);
       return this.http.get<any[]>(`${this.API_URL}/purchase/details`, { params });
    }
}
