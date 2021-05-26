import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdsService } from '../services/ads.service';
import { ActivatedRoute } from '@angular/router';
import { Ad } from '../models/ad';
import { Tag } from '../models/tag';
import { LoggerService } from '../services/logger.service';
import { ImageService } from '../services/image.service';


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  original?: Ad;
  ad: Ad = {id: 0, title: '', description: '', imagePath: '', tags: []};
  newTag: Tag = {id: 0, value: '', useCount: 0, lang: 'en'};
  image?: File;
  message: string = '';
  private lang: string = 'en';
  private nextId: number = 0;

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
      ad.tags.forEach(tag => copyTags.push({id: tag.id, value: tag.value, useCount: tag.useCount, lang: tag.lang}));
      this.ad = {id: ad.id, title: ad.title, description: ad.description, imagePath: ad.imagePath, tags: copyTags};
      if (this.ad?.tags){
        this.nextId = Math.max.apply(Math, this.ad?.tags.map(function(t){return t.id;}))
      }
    });
  }

  back(): void {
    this.location.back();
  }

  adTag(): void{
    if (this.newTag.value){
      this.newTag.lang = this.lang;
      this.ad?.tags.push(this.newTag);
      this.nextId = this.nextId + 1;
      this.newTag = {id: this.nextId, value: '', useCount: 0, lang: 'en'};
    }
  }

  removeTag(tag: Tag): void{
    const index = this.ad?.tags.indexOf(tag);
    console.log(index);
    if (index != undefined){
      this.ad?.tags.splice(index, 1);
    }
  }

  langChanged(newLang: string): void{
    this.lang = newLang;
  }

  save(imageInput: any): void{
    this.message = 'waiting';
    if (imageInput.files.length){
      const file: File = imageInput.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {
        this.imageService.uploadImage(file)
        .subscribe(path => {
          this.ad.imagePath = path;
          this.updateAd();
        })
      });

      reader.readAsDataURL(file);
    } else{
      this.updateAd();
    }
  }

  updateAd(): void{
    this.adsService.updateAd(this.ad.id, this.ad)
    .subscribe(updated => this.afterUpdate(updated))
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
