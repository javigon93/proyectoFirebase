import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from 'src/app/Service/publications.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private publicationsService : PublicationsService) { }
  docId: string;
  docInfo;
  docBlocks;
  ngOnInit(): void {

   this.docId= this.activatedRoute.snapshot.params.id;
   this.publicationsService.getSpecificDocData(this.docId).subscribe(resp=>{

    this.docInfo= resp
    console.log(this.docInfo);
    this.docBlocks=resp.blocks;
    console.log(this.docBlocks.block1);
    
   });
   
   

  }

  formatBlocks(blockInfo){
   let linesArray=blockInfo.split('\n');
   return linesArray

  }

  
  addNewLike(documentRoute){
    this.publicationsService.updateLIkes(documentRoute);
    this.docInfo.likes ++; 
  }





}
