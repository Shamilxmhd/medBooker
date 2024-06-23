import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddApComponent } from './add-ap/add-ap.component';
import { AuthComponent } from './auth/auth.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { component: AuthComponent, path: 'auth' },
  { component: HomeComponent, path: '' },
  { component: AddApComponent, canActivate: [authGuard], path: 'bookAppointment' },
  { component: AppointmentsComponent, canActivate: [authGuard], path: 'appointments' },
  { redirectTo: '', path: '**' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }
