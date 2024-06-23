import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ap',
  templateUrl: './add-ap.component.html',
  styleUrls: ['./add-ap.component.css']
})
export class AddApComponent {
  constructor(private fb: FormBuilder, private toaster: ToastrService, private api: ApiService, private router: Router) { }

  apForm = this.fb.group({
    doctors: ['', [Validators.required,]],
    date: ['', [Validators.required,]],
    startTime: ['', [Validators.required,]],
    endTime: ['', [Validators.required,]],
    description: ['', [Validators.required,]]
  })

  save() {
    if (this.apForm.valid) {
      const doctor = this.apForm.value.doctors
      const date = this.apForm.value.date
      const startTime = this.apForm.value.startTime
      const endTime = this.apForm.value.endTime
      const description = this.apForm.value.description
      const ApDetails = { doctor, date, startTime, endTime, description }
      // api call
      this.api.addApAPI(ApDetails).subscribe({
        next: (res: any) => {
          this.toaster.success('Booking Successfull')
          this.apForm.reset()
          this.router.navigateByUrl('')
        },
        error: (reason: any) => {
          this.toaster.warning(reason.error)
        }
      })

    } else {
      this.toaster.warning('Invalid form')
    }
  }



}
