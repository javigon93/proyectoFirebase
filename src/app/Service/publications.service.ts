import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class PublicationsService {

  constructor(private firestore: AngularFirestore, private router: Router, private afAuth: AngularFireAuth, private firebase: FirebaseApp, private storageService: StorageService) { }
  private publicatonDataSubject = new Subject<any>();
  getUserDocuments() {
    this.afAuth.currentUser.then(resp => {
      this.firestore.collection('users', ref => ref.where('email', '==', resp?.email)).get()
        .subscribe(changes => {
          changes.docs.map(user => {
            let searchedUserId = user.id;
            let refe = this.firebase.firestore().collection('users').doc(searchedUserId);
            this.firestore.collection('documents', ref => ref.where('author', '==', refe)).valueChanges({ idField: 'eventId' })
              .subscribe(async docs => {
                for (let doc of docs) {
                  console.log(doc);
                  doc.eventId
                  doc = await this.getDocumentTypeReference(doc);
                  doc = await this.getAuthorData(doc);
                }
                this.publicatonDataSubject.next(docs)
              }
              );
          })
        });

    })
    return this.publicatonDataSubject.asObservable();
  }

  getProfileDocuments(profileUserName) {
    let publicationsSubject = new Subject<any>();
    this.firestore.collection('users', ref => ref.where('userName', '==', profileUserName)).get().subscribe(resp => {
      let authorId = resp.docs[0].id;
      let refe = this.firebase.firestore().collection('users').doc(authorId);
      this.firestore.collection('documents', ref => ref.where('author', '==', refe)).valueChanges({ idField: 'eventId' })
        .subscribe(async docs => {
          console.log(docs);

          for (let doc of docs) {
            console.log(doc);
            doc.eventId
            doc = await this.getDocumentTypeReference(doc);
            doc = await this.getAuthorData(doc);
          }
          publicationsSubject.next(docs)
        }
        );

    })

    return publicationsSubject.asObservable();

  }

  getAllPublications() {
    let publicationsSubject = new Subject<any>();
    this.firestore.collection('documents').valueChanges({ idField: 'eventId' })
      .subscribe(async docs => {
        let publicationsArray = [];
        for (let doc of docs) {
          doc.eventId
          doc = await this.getDocumentTypeReference(doc);
          doc = await this.getAuthorData(doc);
          publicationsArray.push(doc);
        }
        publicationsSubject.next(publicationsArray)
      });
    return publicationsSubject.asObservable();
  }

  getDocumentTypeReference(publicationDoc) {
    let finalDoc;
    finalDoc = publicationDoc.documentType.get().then(resp => {
      publicationDoc.documentType = resp.data();
      return publicationDoc;
    });

    return finalDoc
  }

  getAuthorData(publicationDoc) {
    let finalDoc;
    finalDoc = publicationDoc.author.get().then(resp => {
      publicationDoc.author = resp.data();
      return publicationDoc;
    });

    return finalDoc;
  }

  getCommentAuthorData(comment) {
    let returnedDocument
    returnedDocument = comment.author.get().then(resp => {
      comment.author = resp.data();
      return comment;
    });
    return returnedDocument
  }

  getSpecificDocData(documentId) {

    let specificDocSubject = new Subject<any>();
    let finalDocData = this.firestore.collection('documents').doc(documentId).get().subscribe(async doc => {
      let data = await doc.data();
      doc = await this.getDocumentTypeReference(data);
      doc = await this.getAuthorData(data);
      specificDocSubject.next(doc)

    });

    return specificDocSubject.asObservable();

  }

  getDocBlocs(docId) {
    let docBlocksSubject = new Subject<any>();
    this.firestore.collection('documents').doc(docId).collection('blocks').valueChanges()
      .subscribe(changes => {
        docBlocksSubject.next(changes[0]);

      });
    return docBlocksSubject.asObservable();
  }

  async createPublication(publicationData, fileToUpload) {
    let finalPublicationData = publicationData
    console.log(publicationData);
    if (publicationData.blob) {
      try {
        console.log('ha llegado al blob');
        console.log(fileToUpload);

        await this.storageService.uploadFile(fileToUpload);
        await this.storageService.getFirestoreURL(publicationData.blob).then(async resp => {
          await resp.subscribe(async resp => {
            finalPublicationData.finalURL = resp;
            if (finalPublicationData.finalURL != null) {
              return new Promise<any>((resolve, reject) => {
                this.firestore
                  .collection("documents")
                  .add(finalPublicationData)
                  .then(res => {
                    this.router.navigateByUrl('/profile/publications')
                  }, err => reject(err));
              });
            }
          })
        })
      } catch (error) {
        console.error(error);
      }
    } else {
      return new Promise<any>((resolve, reject) => {
        this.firestore
          .collection("documents")
          .add(publicationData)
          .then(res => {
            this.router.navigateByUrl('/profile/publications')
          }, err => reject(err));
      });
    }
  }

  async addComment(documentId, data) {
    this.getSpecificDocData(documentId).subscribe(async finalDoc => {
      if (!finalDoc.comments) {
        this.firestore.doc(`documents/${documentId}`).update({ comments: [data] });
      } else {
        let totalComments = await finalDoc.comments;
        await totalComments.push(data);
        await this.firestore.doc(`documents/${documentId}`).update({ comments: totalComments });
      }
    })



  }

  updateVisits(documentId) {
    this.getVisits(documentId).subscribe(resp => {
      let plusOneVisit = resp.visits + 1;
      this.firestore.doc(documentId).update({ visits: plusOneVisit });
    })
  }

  updateLIkes(documentId) {
    this.getVisits(documentId).subscribe(resp => {
      let plusOneLike = resp.likes + 1;
      this.firestore.doc(documentId).update({ likes: plusOneLike });
    })
  }

  getVisits(documentId) {
    let visitsSubject = new Subject<any>();
    this.firestore.doc(documentId).get().subscribe(resp => {
      visitsSubject.next(resp.data());
    });

    return visitsSubject.asObservable();

  }

  async deleteDocument(documentId) {
    return await this.firestore.doc(documentId).delete();
  }


}


