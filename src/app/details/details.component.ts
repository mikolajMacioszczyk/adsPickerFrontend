import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdsService } from '../services/ads.service';
import { ActivatedRoute } from '@angular/router';
import { Ad } from '../models/ad';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  ad?: Ad;

  constructor(
    private adsService: AdsService, 
    private route: ActivatedRoute, 
    private location: Location) 
    { }

  ngOnInit(): void {
    this.retrieveAd();
  }

  retrieveAd(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adsService.getById(id)
    .subscribe(ad => this.ad = ad);
  }

  back(): void {
      this.location.back();
  }

}
