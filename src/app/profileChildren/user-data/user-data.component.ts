import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/Service/storage.service';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  selectedPhoto;
  nameLastName: string = "";
  userData: any = {
    name: "this.userData.name",
    lastName: "this.userData.name",
    description: "this.userData.name",
    userName: "",
    socialNetworks: {
      twitter: "this.userData.name",
      facebook: "this.userData.name",
      instagram: "this.userData.name",
    }
  };
  newProfile = {
    name: this.userData.name,
    lastName: this.userData.lastName,
    description: this.userData.description,
    userName: this.userData.userName,
    socialNetworks: {
      twitter: this.userData.socialNetworks.twitter || "",
      facebook: this.userData.socialNetworks.facebook || "",
      instagram: this.userData.socialNetworks.instagram || "",
    },
    profilePic: null,
    profilePicStorageURL: null,
  }
  constructor(private userService: UsersService, private storageService : StorageService) { }

  ngOnInit(): void {

    this.userService.getUserData().subscribe((resp) => {
      this.userData = resp;
      if (resp != [{}]) {
        this.newProfile = this.userData;
        //this.displayPhoto()
        console.log(this.newProfile)
      }
     
    });

  }

  updateProfile(profile: any) {
      return this.userService.updateUser(profile, this.selectedPhoto);
  }

  getPhoto(event) {
    console.log(event.target.files[0]);
    let file = event.target.files[0];
    this.selectedPhoto = file;
    this.newProfile.profilePic = 'profilePics/' + file.name;

  }

  displayPhoto(){
    if (this.newProfile.profilePic === null) {
      this.storageService.downloadFile('profilePics/nullProfile.png').subscribe(resp => {
        this.newProfile.profilePic = resp;
      });
    } else {
      this.storageService.downloadFile(this.newProfile.profilePic).subscribe(resp => {
        this.newProfile.profilePic = resp;
      });

    }


  }


}
