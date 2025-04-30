import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  imports: [],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent  implements OnInit{


   name='';
   phoneno='';
   email='';
   city=';'

ngOnInit(): void {
   this.name = localStorage.getItem('name') || ''
   this.email = localStorage.getItem('email') || ''
   this.phoneno = localStorage.getItem('phoneno') || ''
   this.city = localStorage.getItem('city') || ''
}
}
