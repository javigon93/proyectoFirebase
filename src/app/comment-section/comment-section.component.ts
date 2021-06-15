import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DateHandlingService } from '../Service/date-handling.service';
import { PublicationsService } from '../Service/publications.service';
import { UsersService } from '../Service/users.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {
  @Input() docInfo;
  @Input() docId;
  
  newCommentTemplate = {
    author : null,
    comment: null,
    creationDate: new Date(),
  }
  constructor(private userService: UsersService, private firestore : AngularFirestore, private publicationsService : PublicationsService, private dateHandlingService : DateHandlingService) { }

  ngOnInit(): void {
    this.generateAuthorReference();
    console.log(this.docInfo.comments);
    
    for (let comment of this.docInfo.comments) {
      this.populateCommentAuthor(comment).then(response => {
        comment=response;
        console.log(comment);

      });
      
      
      
    }
  }

  generateAuthorReference(){
    this.userService.getUserId().subscribe(res=>{
      if (res) {
       this.newCommentTemplate.author= this.firestore.doc('/users/'+res).ref;
      }
      
     })
   }

   formatDate(timestampDate){
    return this.dateHandlingService.complexFormatDate(timestampDate);
   }

   addCommentToPublication(){
     console.log(this.docId);
     
    this.publicationsService.addComment(`${this.docId}`, this.newCommentTemplate);
   }

   populateCommentAuthor(comment){
   return this.publicationsService.getCommentAuthorData(comment);

   }
}
