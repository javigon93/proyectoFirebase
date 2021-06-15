import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: string = "";
  email: string = "";
  isError: boolean = false;
  rememberIsChecked = false;
  userEmailData;

  constructor(private authService: AuthService, private cookiesService: CookieService) { }

  ngOnInit() {
    if (this.cookiesService.check('login')) {
      this.processLoginCookie();
      this.rememberIsChecked = true;
    }
  }

  loginGoogle() {
    this.authService.googleLogin();
  }

  localLogin() {
    if (this.password != "" && this.email != "" && this.rememberIsChecked === true) {
      this.authService.login(
        this.email,
        this.password
      );
      this.cookiesService.set('login', `${this.email}_${this.password}`, { path: '/' });

    } else if (this.password != "" && this.email != "" && this.rememberIsChecked === false) {
      this.authService.login(
        this.email,
        this.password
      );

      this.cookiesService.delete('login');
    } else {

      this.isError = true
    }
  }

  rememberCheckHandler() {
    if (this.rememberIsChecked) {
      this.rememberIsChecked = false;
    }
    else {
      this.rememberIsChecked = true;
    }
  }

  processLoginCookie() {
    let cookieData = this.cookiesService.get('login');
    let cookieDataParts = cookieData.split('_');
    this.email = cookieDataParts[0];
    this.password = cookieDataParts[1];
  }

}
