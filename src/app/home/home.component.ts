import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private router: Router, private toaster: ToastrService) { }
  bookAp() {
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl('/bookAppointment')
    } else {
      this.toaster.warning('Please Login')
    }
  }
}
