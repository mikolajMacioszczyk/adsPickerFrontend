import { Component, OnInit } from '@angular/core';
import { AdsService } from '../services/ads.service';
import { Ad } from '../models/ad';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.css']
})
export class AllAdsComponent implements OnInit {
  ads: Ad[] = []

  constructor(private adsService: AdsService) { }

  ngOnInit(): void {
    this.retrieveAll();
  }

  retrieveAll(): void{
    this.adsService.getAll()
    .subscribe(ads => this.ads = ads);
  }

}
