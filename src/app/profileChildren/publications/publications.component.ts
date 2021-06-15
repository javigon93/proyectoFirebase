import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { PublicationsService } from 'src/app/Service/publications.service';
import { Timestamp } from '@firebase/firestore-types'
import { DateHandlingService } from 'src/app/Service/date-handling.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  displayDelete = false;
  constructor(private publicationsService: PublicationsService, private dateHandlingService : DateHandlingService) { }
  userPublications: any[];
  selectedDocumentId;
  ngOnInit(): void {

    this.publicationsService.getUserDocuments().subscribe(resp => {
      this.userPublications = resp;
      console.log(this.userPublications);

    })

  }

  formatDate(timestampDate) {
    return this.dateHandlingService.simpleFormatDate(timestampDate)
  }

  changeDisplay() {
    if (this.displayDelete == true) {
      this.displayDelete = false;
    } else {
      this.displayDelete = true;
    }
  }

  async deletePublication(idDocument) {
    await this.publicationsService.deleteDocument(idDocument);
    this.displayDelete = false;
  }


}
