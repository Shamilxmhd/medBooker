import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  allAppointments: any = []
  doctorImg: any = ''
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getAppointments()
  }

  getAppointments() {
    this.api.getApAPI().subscribe({
      next: (res: any) => {
        this.allAppointments = res;
        console.log(this.allAppointments);
        this.allAppointments.forEach((appointment: any) => {
          if (appointment.doctor === "Nazer T") {
            appointment.doctorImg = 'https://media.licdn.com/dms/image/D5603AQEz1Ckn0fJLsQ/profile-displayphoto-shrink_800_800/0/1679722950345?e=2147483647&v=beta&t=ST0w2oaSxrlLabCLERGJIhHuhAvZj8YynmGDTbHHVTg';
          } else if (appointment.doctor === "Dr. Vishnu K S") {
            appointment.doctorImg = "https://www.asterhospitals.in/sites/default/files/2023-06/Dr.%20Tony%20Jose.jpeg";
          } else if (appointment.doctor === "Tony Jose") {
            appointment.doctorImg = "https://www.asterhospitals.in/sites/default/files/2023-03/Dr.%20Gireesh%20G%20N.jpeg";
          } else {
            appointment.doctorImg = "https://www.asterhospitals.in/sites/default/files/2023-03/Dr.%20Anish%20Kumar.jpeg";
          }
        });
      },
      error: (reason: any) => {
        alert(reason.message);
      }
    });
  }

  Cancel(id: any) {
    this.api.deleteApAPI(id).subscribe((res) => {
      this.getAppointments()
    })
  }

}
