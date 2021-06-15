import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  constructor(private cookiesService: CookieService) { }


  private isLogged: boolean | undefined;
  private loggedStatusSubject = new BehaviorSubject<boolean>(false);

  setLoggedStatus() :Observable<boolean> {
    if (this.cookiesService.check('isLogged')) {
        this.loggedStatusSubject.next(true);
    } else if(!this.cookiesService.check('isLogged')){
       this.loggedStatusSubject.next(false);
    }
    return this.loggedStatusSubject.asObservable();
  }

  getLoggedStatus(): Observable<boolean> {
    let isLogged;
     this.setLoggedStatus().subscribe(resp => {
      isLogged=resp;
    })

    return isLogged;
  }
  
}
