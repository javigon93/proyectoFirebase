import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginStatusService } from './login-status.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afAuth: AngularFireAuth,
    private router: Router, private loginStatusService: LoginStatusService, private cookiesService: CookieService) { }

  async createUser(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Ha habido un error");
      });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        this.cookiesService.set('isLogged', 'true');
        this.loginStatusService.setLoggedStatus();
        this.router.navigateByUrl('/profile/userData');
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
      });
  }

  googleLogin() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
        console.log('Sucess', value);
        this.cookiesService.set('isLogged', 'true');
        this.loginStatusService.setLoggedStatus();
        this.router.navigateByUrl('/profile/userData');
      })
      .catch(error => {
        console.log('Something went wrong: ', error);
      });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.cookiesService.delete('isLogged');
      this.loginStatusService.setLoggedStatus()
      this.router.navigate(['/']);
    });
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider);
  }
}
