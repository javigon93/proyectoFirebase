import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { PublicationsService } from '../Service/publications.service';
import { StorageService } from '../Service/storage.service';
import { Pipe } from '@angular/core';
import { DateHandlingService } from '../Service/date-handling.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  @Pipe({ name: 'filesize' })
  publications;
  retrieveDisplay = false;
  constructor(private publicationsService: PublicationsService, private storageService: StorageService, private dateHandling: DateHandlingService) { }

  ngOnInit(): void {
    this.loadPublications()
  }

  loadPublications() {

    this.publicationsService.getAllPublications().subscribe(response => {
      this.publications = response


    })

  }

  loadPhoto(photoRoute) {
    let photoSubject = new Subject<any>();
    this.storageService.downloadFile(photoRoute).subscribe(resp => {
      photoSubject.next(resp);

    })
    return photoSubject.asObservable
  }

  loadVideo(videoRoute) {
    let videoSubject = new Subject<any>();
    this.storageService.downloadFile(videoRoute).subscribe(resp => {
      videoSubject.next(resp)
    });
    return videoSubject.asObservable();
  }

  formatDate(timestampDate) {
    return this.dateHandling.complexFormatDate(timestampDate);
  }

  addNewLike(document) {
    this.publicationsService.updateLIkes('documents/' + document.eventId);
    return document.likes++;
  }


}
