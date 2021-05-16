import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdsService } from '../services/ads.service';
import { ActivatedRoute } from '@angular/router';
import { Ad } from '../models/ad';
import { Tag } from '../models/tag';
import { LoggerService } from '../services/logger.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  original?: Ad;
  ad?: Ad;
  newTag: Tag = {id: 0, value: '', useCount: 0};
  image?: File;
  message: string = '';

  constructor(
    private adsService: AdsService, 
    private imageService: ImageService,
    private route: ActivatedRoute, 
    private location: Location,
    private loggerService: LoggerService) 
    { }

  ngOnInit(): void {
    this.retrieveAd();
  }

  retrieveAd(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adsService.getById(id)
    .subscribe(ad => {
      this.original = ad;
      const copyTags: Tag[] = [];
      ad.tags.forEach(tag => copyTags.push({id: tag.id, value: tag.value, useCount: tag.useCount}));
      this.ad = {id: ad.id, title: ad.title, description: ad.description, imagePath: ad.imagePath, tags: copyTags};
    });
  }

  back(): void {
    this.location.back();
  }

  adTag(): void{
    if (this.newTag.value){
      this.ad?.tags.push(this.newTag);
      this.newTag = {id: 0, value: '', useCount: 0};
    }
  }

  removeTag(tag: Tag): void{
    const index = this.ad?.tags.indexOf(tag);
    console.log(index);
    if (index != undefined){
      this.ad?.tags.splice(index, 1);
    }
  }

  save(): void{
    if (this.ad){
      if (this.image){
        this.ad.imagePath = this.imageService.uploadImage(this.image)
      }
      this.adsService.updateAd(this.ad.id, this.ad)
      .subscribe(updated => this.afterUpdate(updated))
    }
  }

  afterUpdate(updated: Ad): void{
    if (!updated){
      this.loggerService.adLog(`EditComponent: cannot edit ad with id=${this.ad?.id}`);
      this.message = 'fail';
    } else{
      this.message = 'success';
    }
  }
}
