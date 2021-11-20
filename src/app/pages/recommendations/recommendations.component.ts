import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/category";
import {JobsApiService} from "../../services/jobs-api.service";
import {Job} from "../../models/job";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  categories: Array<Category>=[];
  jobs:Array<Job>=[];
  selected!:number

  constructor(private categoriesService: CategoriesService, private jobsApiService: JobsApiService) {
  }

  ngOnInit(): void {
    this.getAllCategories()
  }

  onChange($event:any) {
    this.selected = $event.target.options[$event.target.options.selectedIndex].value;
  }

  getAllCategories():void{
    this.categoriesService.getAllCategories().subscribe((response: any)=>{
      this.categories=response.content;
    });
  }

  getJobsByCategoryId():void{
    this.jobsApiService.getJobsByCategoryId(this.selected).subscribe((response: any)=>{
      this.jobs=response.content;
    });
  }

}
