import { Component, OnInit } from '@angular/core';
import { PageItemsService } from '../Service/page-items.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  items: string[] = [];
  userTypeList: string[] = [];
  constructor(private itemsService: PageItemsService) { }

  ngOnInit(): void {
    this.items = this.itemsService.getMainPageReasons();
    this.userTypeList = this.itemsService.getMainPageUserTypes();
  }

}
