import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../modules/purchase.modules';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  private API_URL="http://localhost:3000/purchase"

  constructor(private http:HttpClient) { }

  create(data:Purchase,emp_email:string):Observable<Purchase>
  {
    const params=new HttpParams().set('emp_email',emp_email)
   return this.http.post<Purchase>(this.API_URL,data,{params})
  }

  findAll():Observable<Purchase[]>
  {
    return this.http.get<Purchase[]>(this.API_URL);
  }

  findOne(id:string):Observable<Purchase>
  {
    return this.http.get<Purchase>(`${this.API_URL}/${id}`);
  }

  update(id:string,data:Purchase):Observable<Purchase>
  {
    return this.http.put<Purchase>(`${this.API_URL}/${id}`,data)
  }

  delete(id:string):Observable<Purchase>
  {
    return this.http.delete<Purchase>(`${this.API_URL}/${id}`)
  }

  getUsersEmailDetails(email:string):Observable<any[]>
  {
    const params= new HttpParams().set('email',email)
    return this.http.get<any[]>(`${this.API_URL}/details`,{params})
  }
}
