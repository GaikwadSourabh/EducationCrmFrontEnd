import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../modules/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {


  private API_URL="http://localhost:3000/feedback";
  constructor(private http:HttpClient) { }

    findAll(page:number,limit:number):Observable<{data:Feedback[],total:number}>
    {
      const params = new HttpParams().set('page',page).set('limit',limit);
      return this.http.get<{data:Feedback[],total:number}>(this.API_URL,{params});
    }

    create(data:any):Observable<Feedback>
    {
      return this.http.post<Feedback>(this.API_URL,data);
    }

    updateStatus(id:string,read_status:string):Observable<Feedback>
    {
      return this.http.patch<Feedback>(`${this.API_URL}/${id}`,{read_status});
    }

}
