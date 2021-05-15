import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdsService } from '../services/ads.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ad } from '../models/ad';
import { Tag } from '../models/tag';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  original?: Ad;
  ad?: Ad;

  constructor(
    private adsService: AdsService, 
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

  save(): void{
    if (this.ad){
      this.adsService.updateAd(this.ad.id, this.ad)
      .subscribe(isUpdated => {
        if (!isUpdated){
          this.loggerService.adLog(`EditComponent: cannot edit ad with id=${this.ad?.id}`)
        }
        this.back();
      })
    }
  }
}
