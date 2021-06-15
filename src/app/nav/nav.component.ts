import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { LoginStatusService } from '../Service/login-status.service';
import { UsersService } from '../Service/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isLogged:boolean=true;
  userPhotoURL;
  showDropdown = false
  constructor(private isLoggedService: LoginStatusService, private authService: AuthService, private userService : UsersService) { }

  ngOnInit(): void {
    this.isLoggedService.setLoggedStatus().subscribe(status=>{
      this.isLogged=status;
      if (this.isLogged) {
        this.getUserInfo().subscribe(resp=>{
          console.log(resp);
          this.userPhotoURL=resp.profilePicStorageURL;
        })
      }
    })
  }

  logOut(){
    this.authService.logout()
  }

  getUserInfo(){
    return this.userService.getUserData();
  }

  dropdownDisplayHandler(){
    if (this.showDropdown) {
      this.showDropdown = false;
    } else {
      this.showDropdown =true;
    }

  }



}
