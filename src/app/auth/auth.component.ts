declare var google: any
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  hide: boolean = true
  // eye icon
  eyeIcon() {
    this.hide = !this.hide
  }

  // login design
  isRegisterActive: boolean = false;
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: "544204171131-qj7d9kve7pgf1c99f3g4hiqp34fvs63e.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    google.accounts.id.renderButton(document.getElementById("google-button"),
      { type: "icon", theme: "outline", size: "large" }
    );
  }
  tokenDecode(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }
  handleCredentialResponse(response: any) {
    console.log(response);
    if (response) {
      // token decode
      const payload = this.tokenDecode(response.credential)
      console.log(payload);

      // store in section
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload))
      sessionStorage.setItem('token', JSON.stringify(payload))
      // navigate
      this.router.navigateByUrl('/')
    }
  }



  activateRegister() {
    this.isRegisterActive = true;
  }
  activateLogin() {
    this.isRegisterActive = false;
  }

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private toaster: ToastrService) { }
  // Form validation
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  // register
  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      const user = { username, email, password }
      // api call
      this.api.registerAPI(user).subscribe({
        next: (res: any) => {
          this.toaster.success(`${res.username} has successfully registered..`)
          this.registerForm.reset()
          this.isRegisterActive = false;
        },
        error: (reason: any) => {
          this.toaster.warning(reason.error)
        }
      })
    } else {
      alert('Invalid form !!!')
    }
  }

  // login
  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      const user = { email, password }
      // api call
      this.api.loginAPI(user).subscribe({
        next: (res: any) => {
          this.toaster.success(`${res.existingUser.username} has logged in successfully`)
          sessionStorage.setItem("existingUser", JSON.stringify(res.existingUser))
          sessionStorage.setItem("token", res.token)
          this.loginForm.reset()
          this.router.navigateByUrl('')
        },
        error: (reason: any) => {
          this.toaster.warning(reason.error)
        }
      })
    } else {
      alert('Invalid form..')
    }
  }

}
