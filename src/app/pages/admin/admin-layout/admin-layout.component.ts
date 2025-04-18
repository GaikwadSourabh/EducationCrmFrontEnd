import { Component } from '@angular/core';
import { AdminNavBarComponent } from '../../../component/admin/admin-nav-bar/admin-nav-bar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminNavBarComponent,RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {

}
