import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
  }


  currentYear(){
    let currentDate:Date= new Date();
    return currentDate.getFullYear()
  }

}
