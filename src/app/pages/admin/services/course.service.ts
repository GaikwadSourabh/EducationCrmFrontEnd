import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../modules/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

   private baseUrl = 'http://localhost:3000/admin/course';

  constructor(private http:HttpClient) { }

  createCourse(data:FormData):Observable<any>
  {
    return this.http.post(this.baseUrl,data);
  }

  getCourses(page:number=1,limit:number=5):Observable<any>
  {
    const params = new HttpParams().set('page',page).set('limit',limit);
    return this.http.get(this.baseUrl,{params});
  }

  getCourseById(id:string):Observable<Course>
  {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  updateCourse(id:string, data:Partial<Course>):Observable<Course>
  {
    return this.http.put<Course>(`${this.baseUrl}/${id}`, data);
  }

  deleteCourse(id:string):Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getAllCourses():Observable<Course[]>
  {
     return this.http.get<Course[]>(`${this.baseUrl}/all`);
  }
}
