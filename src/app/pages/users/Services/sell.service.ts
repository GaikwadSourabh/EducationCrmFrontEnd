import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../modules/purchase.modules';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  private API_URL="http://localhost:3000/purchase"

  constructor(private http:HttpClient) { }

  create(data:Purchase):Observable<Purchase>
  {
   return this.http.post<Purchase>(this.API_URL,data)
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
}
