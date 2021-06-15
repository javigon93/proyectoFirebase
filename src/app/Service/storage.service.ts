import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  async uploadFile(toUploadFile) {
    const file = toUploadFile;
    const filePath = `movies/${file.name}`
    const ref = this.storage.ref(filePath);
    const task = await ref.put(file);
  }

  async uploadProfilePhoto(toUploadPhoto) {
    const file = toUploadPhoto;
    const filePath = `profilePics/${file.name}`
    const ref = this.storage.ref(filePath);
    const task = await ref.put(file);
  }

  downloadFile(reference) {
    const ref = this.storage.ref(reference);
    let result = ref.getDownloadURL();
    return result
  }

  async getFirestoreURL(reference) {
    const ref = this.storage.ref(reference);
    return ref.getDownloadURL();
  }
}
