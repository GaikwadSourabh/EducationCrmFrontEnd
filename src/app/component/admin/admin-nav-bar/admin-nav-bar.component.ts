import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  imports: [RouterLink],
  templateUrl: './admin-nav-bar.component.html',
  styleUrl: './admin-nav-bar.component.css'
})
export class AdminNavBarComponent {

constructor(private router:Router){}

  logout()
 {
  localStorage.clear();
  this.router.navigate(['/']);
 }

}
