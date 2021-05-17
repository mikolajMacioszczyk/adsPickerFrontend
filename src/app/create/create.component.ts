import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdsService } from '../services/ads.service';
import { Ad } from '../models/ad';
import { Tag } from '../models/tag';
import { LoggerService } from '../services/logger.service';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent{
  private id: number = 0;
  ad: Ad = {id: 0, title: '', description: '', imagePath: '', tags: []}
  newTag: Tag = {id: 0, value: '', useCount: 0};
  image?: File;
  failed: boolean = false;

  constructor(
    private adsService: AdsService, 
    private imageService: ImageService,
    private location: Location,
    private loggerService: LoggerService,
    private router: Router) 
    { }

  back(): void {
    this.location.back();
  }

  adTag(): void{
    if (this.newTag.value){
      this.ad?.tags.push(this.newTag);
      this.id = this.id + 1;
      this.newTag = {id: this.id, value: '', useCount: 0};
    }
  }

  removeTag(tag: Tag): void{
    const index = this.ad?.tags.indexOf(tag);
    console.log(index);
    if (index != undefined){
      this.ad?.tags.splice(index, 1);
    }
  }

  save(imageInput: any): void{
    if (imageInput.files.length){
      const file: File = imageInput.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {
        this.imageService.uploadImage(file)
        .subscribe(path => {
          this.ad.imagePath = path;
          this.create();
        })
      });

      reader.readAsDataURL(file);
    } else{
      this.create();
    }
  }

  create(): void{
    this.adsService.createAd(this.ad)
    .subscribe(created => this.afterCreated(created))
  }

  afterCreated(created: Ad): void{
    if (!created){
      this.loggerService.adLog(`EditComponent: cannot edit ad with id=${this.ad?.id}`);
      this.failed = true;
    } else{
      this.failed = false;
      this.router.navigate(['/edit', created.id]);
    }
  }
}
