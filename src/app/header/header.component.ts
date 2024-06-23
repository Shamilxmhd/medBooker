import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // shadow when scrolling
  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 0;
  }

  loginUsername: string = ''
  constructor(private router: Router) { }
  ngOnInit(): void {
    const existingUser = sessionStorage.getItem('existingUser');
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (existingUser) {
      this.loginUsername = JSON.parse(existingUser).username.split(' ')[0];
    } else if (loggedInUser) {
      this.loginUsername = JSON.parse(loggedInUser).name.split(' ')[0];
    } else {
      this.loginUsername = '';
    }
  }

  logout() {
    sessionStorage.clear()
    this.loginUsername = ''
    this.router.navigateByUrl('')
  }
}
