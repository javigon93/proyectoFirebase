import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHandlingService {

  constructor() { }

  complexFormatDate(timestampDate) {
    let currentDate :Date= new Date();
    let startingDate: Date = timestampDate.toDate();
    let timeDiff = currentDate.getTime() - startingDate.getTime();
    let hours = (timeDiff / (1000 * 60 * 60))

    if (hours <= 24 && hours > 1) {
      return 'Hace ' + hours.toFixed(0) + ' horas';
    } else if (hours === 1) {
      return 'Hace 1 hora';
    } else if (hours < 1) {
      let minutes = hours * 60;
      return `Hace ${minutes.toFixed(0)} minutos`
    } else {
      let days = hours / 24;
      return 'Hace ' + Math.trunc(days) + ' días';
    }
  }

  simpleFormatDate(timestampDate) {
    let date: Date = timestampDate.toDate();
    return date.toLocaleDateString();

  }

   msToHours(ms) {
    
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    
  }


}
