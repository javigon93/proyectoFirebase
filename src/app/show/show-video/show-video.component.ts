import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PublicationsService } from 'src/app/Service/publications.service';
import { StorageService } from 'src/app/Service/storage.service';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.scss']
})
export class ShowVideoComponent implements OnInit {
  profileUrl;
  docId;
  docInfo;
  
  constructor(private storageService: StorageService, private activatedRoute: ActivatedRoute, private publicationsService: PublicationsService) { }

  ngOnInit(): void {
    this.docId = this.activatedRoute.snapshot.params.id;
    this.publicationsService.getSpecificDocData(this.docId).subscribe(resp => {
      this.docInfo = resp
      this.storageService.downloadFile(this.docInfo.blob).subscribe(resp => {
        this.profileUrl = resp;
        console.log(this.profileUrl);
        this.addNewVisit(`/documents/${this.docId}`);
      });


    })

  }

  addNewVisit(documentRoute){
    this.publicationsService.updateVisits(documentRoute);

  }

  addNewLike(documentRoute){
    this.publicationsService.updateLIkes(documentRoute);
    this.docInfo.likes ++; 
  }




}
