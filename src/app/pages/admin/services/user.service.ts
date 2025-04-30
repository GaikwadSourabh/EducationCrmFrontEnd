import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../modules/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL="http://localhost:3000/users";

  constructor(private http:HttpClient) { }


  finadAll(page:number,limit:number):Observable<{data:Users[],total:number}>
  {
    const params= new HttpParams().set('page',page).set('limit',limit);
    return this.http.get<{data:Users[],total:number}>(this.API_URL,{params});
  }

  create(data:Users):Observable<Users>
  {
    return this.http.post<Users>(this.API_URL,data);
  }

  update(id:string,data:Users):Observable<Users>
  {
    return this.http.put<Users>(`${this.API_URL}/${id}`,data)
  }

  updateStatus(id: string, status: string) {
    return this.http.patch(`${this.API_URL}/${id}/status?isBanned=${status}`, { status });
  }
}
