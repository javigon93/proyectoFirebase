import { Component, OnInit } from '@angular/core';
import { LoginData } from '../Models/loginData.models';
import { AuthService } from '../Service/auth.service';
import { UsersService } from '../Service/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  password:string="";
  repPassword: string = "";
  data: LoginData ={
    email:"",
    firstName: "",
    lastName: "",
    description: "",
    userName:"",
    socialNetworks : {
      facebook:"",
      twitter: "",
      instagram: "",
    }
      
  }

  isAuthError:boolean=false;
  
  constructor(private authService: AuthService, private userService: UsersService) { } 

  ngOnInit(): void {
  }

  async register(){

  if (this.data.firstName && this.data.lastName && this.data.email && this.password !== "") {
    if (this.password === this.repPassword) {
      try {
        await this.authService.createUser(this.data.email, this.password);
        this.userService.createUser(this.data);
      } catch (error) {
        
      }
     
    }
  }
  }


}
