import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DateHandlingService } from '../Service/date-handling.service';
import { PublicationsService } from '../Service/publications.service';
import { StorageService } from '../Service/storage.service';
import { UsersService } from '../Service/users.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {

  constructor(private publicationsService: PublicationsService, private activatedRoute: ActivatedRoute, private firestore: AngularFirestore, private userService: UsersService, private storageService: StorageService, private dateHandlingService: DateHandlingService) { }
  userPublications: any[];
  userInfo;
  userPhoto;
  currentUsername;
  ngOnInit(): void {
    this.currentUsername = this.activatedRoute.snapshot.params.id;
    this.publicationsService.getProfileDocuments(this.currentUsername).subscribe(resp => {
      this.userPublications = resp;
      console.log(this.userPublications);

    })
    this.userService.getProfileUserData(this.currentUsername).subscribe((resp) => {
      this.userInfo = resp;
      if (resp != [{}]) {
        this.displayPhoto()
      }
    });
  }

  formatDate(timestampDate) {
    return this.dateHandlingService.simpleFormatDate(timestampDate)

  }


  displayPhoto() {
    if (this.userInfo.profilePic === null) {
      this.storageService.downloadFile('/profilePics/nullProfile.png').subscribe(resp => {
        this.userPhoto = resp;
      });
    } else {
      this.storageService.downloadFile(this.userInfo.profilePic).subscribe(resp => {
        this.userPhoto = resp;
      });

    }


  }


}
