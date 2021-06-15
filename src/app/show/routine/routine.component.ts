import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from 'src/app/Service/publications.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private publicationsService : PublicationsService) { }
  docId: string;
  docInfo;
  docBlocks;
  ngOnInit(): void {

   this.docId= this.activatedRoute.snapshot.params.id;
   this.publicationsService.getSpecificDocData(this.docId).subscribe(resp=>{

    this.docInfo= resp
    console.log(this.docInfo);
    this.publicationsService.getDocBlocs(this.docId).subscribe(resp=>{
      this.docBlocks=resp;
      console.log(this.docBlocks);
      
    })
   });
   
   

  }

  formatBlocks(blockInfo){
   let linesArray=blockInfo.split('  ');
   return linesArray

  }

  addNewLike(documentRoute){
    this.publicationsService.updateLIkes(documentRoute);
    this.docInfo.likes ++; 
  }


}
