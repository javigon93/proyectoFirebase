import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageItemsService {

  mainPageReasons: string[] = [

    'Sube tus videos caseros',
    'Diseña y publica tu rutina de ejercicios',
    'Enseña tus recetas favoritas',
    'Comenta y expresa tu opinión',
    'Interacciona con la comunidad',
    'Investiga sobre tu nutrición'



  ];

  mainPageUserTypes: string[] = [
    'Deportistas Amateur', 'Tutores Entrenadores', 'Principiantes sin experiencia', 'Entusiastas del deporte en casa'


  ]


  constructor() { }

  getMainPageReasons() {
    return this.mainPageReasons;
  }

  getMainPageUserTypes() {
    return this.mainPageUserTypes;
  }
}



