import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER_URL = 'https://medbooker-server.onrender.com';
  constructor(private http: HttpClient) { }

  // register API
  registerAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/register`, user)
  }

  // login API
  loginAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/login`, user)
  }

  // token append
  appendTokenToHeader() {
    const token = sessionStorage.getItem('token')
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  // addAppointmentAPI
  addApAPI(ApDetails: any) {
    return this.http.post(`${this.SERVER_URL}/add-ap`, ApDetails, this.appendTokenToHeader())
  }

  // getAppointmentAPI
  getApAPI() {
    return this.http.get(`${this.SERVER_URL}/get-ap`, this.appendTokenToHeader())
  }

  // deleteAppointmentAPI
  deleteApAPI(id: any) {
    return this.http.delete(`${this.SERVER_URL}/delete-ap/${id}`, this.appendTokenToHeader())
  }

  // guarding
  isLoggedIn() {
    return !!sessionStorage.getItem('token')
  }



}


