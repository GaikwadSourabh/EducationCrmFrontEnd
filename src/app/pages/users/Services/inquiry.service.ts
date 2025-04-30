import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  private API_URL="http://localhost:3000/inquiry"
  constructor(private http:HttpClient) { }


  searchFollowUps(empEmail:string,followUpDate:string):Observable<any[]>
  {
    const params = new HttpParams()
    .set('followUpDate',followUpDate)
    .set('empEmail',empEmail)

    return this.http.get<any[]>(`http://localhost:3000/followUps`, { params })
  }

  

  submitInquiry(data:any,params?:any)
  {
    let httpParams = new HttpParams();
    if (params) {
      for (let key in params) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
     return this.http.post(this.API_URL,data,{ params: httpParams })
  }

  searchInquiries(phoneno:string):Observable<any[]>
  {
    return this.http.get<any[]>(`${this.API_URL}/${phoneno}`)
  }


}
