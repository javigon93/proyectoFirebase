import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userDataSubject = new Subject<any>();
  constructor(private firebase: FirebaseApp, private firestore: AngularFirestore, private router: Router, private afAuth: AngularFireAuth, private storageService: StorageService, private cookiesService: CookieService) { }

  createUser(data: any) {
    this.storageService.getFirestoreURL('profilePics/nullProfile.png').then(async resp => {
      resp.subscribe(async response => {
        data.profilePicStorageURL = await response;
        data.userName = await data.firstName;
        new Promise<any>((resolve, reject) => {
          this.firestore
            .collection("users")
            .add(data)
            .then(res => {
              this.router.navigateByUrl('/profile/userData')
              this.cookiesService.set('isLogged', 'true')
            }, err => reject(err));
        });
      })
    })
  }

  getProfileUserData(username) {
    let profileUserSubject = new Subject<any>();
    this.firestore.collection('users', ref => ref.where('userName', '==', username)).valueChanges()
      .subscribe(changes => {
        console.log(changes);
        profileUserSubject.next(changes[0]);
      })

    return profileUserSubject.asObservable();
  }

  getUserData() {
    this.afAuth.currentUser.then(resp => {
      this.firestore.collection('users', ref => ref.where('email', '==', resp?.email)).get()
        .subscribe(changes => {
          changes.docs.map(doc => {
            console.log(doc.data());
            this.userDataSubject.next(doc.data());
          })
        })
    });

    return this.userDataSubject.asObservable();
  }


  async updateUser(profileData: any, selectedPhoto: any) {
    if (selectedPhoto !== undefined) {
      try {
        await this.storageService.uploadProfilePhoto(selectedPhoto);
        await this.storageService.getFirestoreURL('profilePics/' + selectedPhoto.name).then(async resp => {
          resp.subscribe(async response => {
            profileData.profilePicStorageURL = await response;
            const query = this.firestore.collection('users', ref => ref.where('email', '==', profileData.email));
            query.snapshotChanges().forEach((changes) => {
              changes.map((a) => {
                let id = a.payload.doc.id;
                return this.firestore.collection('users').doc(id).update(profileData);
              });
            });
          })
        });
        this.router.navigateByUrl('profile/userData');
      } catch (error) {
        console.error(error);
      }
    } else {
      const query = this.firestore.collection('users', ref => ref.where('email', '==', profileData.email));
      query.snapshotChanges().forEach((changes) => {
        changes.map((a) => {
          let id = a.payload.doc.id;
          return this.firestore.collection('users').doc(id).update(profileData);
        });
      });
    }
  }

  getUserId() {
    let idSubject = new Subject<any>();
    this.afAuth.currentUser.then(resp => {
      console.log(resp);

      this.firestore.collection('users', ref => ref.where('email', '==', resp.email)).valueChanges({ idField: 'eventId' })
        .subscribe(resp => {
          console.log(resp);

          idSubject.next(resp[0].eventId);
        })
    });
    return idSubject.asObservable();
  }

}
