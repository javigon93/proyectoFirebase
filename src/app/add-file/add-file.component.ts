import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { PublicationsService } from '../Service/publications.service';
import { StorageService } from '../Service/storage.service';
import { UsersService } from '../Service/users.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {



  constructor(private firestore : AngularFirestore, private userService : UsersService, private publicationService: PublicationsService, private storageService : StorageService) { }
  selectedFile;
  selectedOption: any = "video"
  baseData = {
    author: null,
    title: "",
    description: "",
    likes: 0,
    dislikes: 0,
    status: 'open',
    visits: 0,
    documentType: null,
    blocks: {
      block1: null,
      block2: null,
      block3: null,
      block4: null,
      block5: null,
    },
    blob: null,
    creationDate:new Date(),
    finalURL: null
  }
  ngOnInit(): void {
    this.generateAuthorReference();
    
    
  }

  generateAuthorReference(){
   this.userService.getUserId().subscribe(res=>{
     if (res) {
       console.log(res);
       
      this.baseData.author= this.firestore.doc('/users/'+res).ref;
      console.log(this.baseData);
     }
     
    })
    
  }

 async generateDocumentTypeReference(){
    switch (this.selectedOption) {
      case 'video':
        this.baseData.documentType= this.firestore.collection('documentTypes').doc('E7Vo2efASYOC9lCsXSLW').ref;
        break;
      case 'routine':
        this.baseData.documentType =this.firestore.doc('/documentTypes/kzWLHGcCIT07S4i4NaYO').ref;
        break;
      case 'recipe':
        this.baseData.documentType = this.firestore.collection('documentTypes').doc('vggwGRIQDBvTs0wAUXnR').ref;
    }
  }

  checkMinimumDocInfo(){
    switch(this.selectedOption){
      case 'video':
        if (this.baseData.author && this.baseData.title != "" && this.baseData.blob != null ) {
          return true;
        }
      break;
      case 'recipe':
        if (this.baseData.author && this.baseData.title != "" && this.baseData.blocks.block1 && this.baseData.blocks.block2 && this.baseData.blocks.block3 && this.baseData.blocks.block4) {
          return 'true'
        }
        break;
        case 'routine':
          if (this.baseData.author && this.baseData.title != "" && this.baseData.blocks.block1 && this.baseData.blocks.block2 && this.baseData.blocks.block3 && this.baseData.blocks.block4 && this.baseData.blocks.block5) {
            return 'true'
          }
          break;
        default:
          return false;
    }
    return false;
  }

 async createNewDocument(documentData){
    if (this.checkMinimumDocInfo()) {
      await this.generateDocumentTypeReference();
      this.publicationService.createPublication(documentData, this.selectedFile)
    }
  }

  getFile(event){
    console.log(event.target.files[0]);
    let file = event.target.files[0];
    this.selectedFile= file;
    this.baseData.blob='movies/'+file.name;

  }

}
