import { Component, OnInit } from '@angular/core';
import { AdsService } from '../services/ads.service';
import { Ad } from '../models/ad';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.css']
})
export class AllAdsComponent implements OnInit {
  ads: Ad[] = []

  constructor(private adsService: AdsService, private loggerService: LoggerService) { }

  ngOnInit(): void {
    this.retrieveAll();
  }

  retrieveAll(): void{
    this.adsService.getAll()
    .subscribe(ads => this.ads = ads);
  }

  removeAd(adId: number): void{
    this.adsService.removeAd(adId)
    .subscribe(isRemoved => this.afterRemove(isRemoved, adId));
  }

  private afterRemove(isRemoved: boolean, adId: number): void {
    if (isRemoved) {
      this.removeAdFromList(adId)
    } else {
      this.loggerService.adLog(`AllAdsComponent: cannot remove ad with id=${adId}`);
    }
  }

  private removeAdFromList(removedId: number){
    this.ads = this.ads.filter(ad => ad.id != removedId);
  }

}
