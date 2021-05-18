import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Ad } from '../models/ad';
import { AdsService } from '../services/ads.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  private allAds: Ad[] = [];
  ads: Ad[] = [];
  kitchen = new FormControl('all');

  constructor(private adsService: AdsService) { }

  ngOnInit(): void {
    this.retrieveAds();
  }

  private retrieveAds(): void{
    this.adsService.getAll()
    .subscribe(ads => {
      this.allAds = ads.filter(tag => tag.tags.find(t => 
      t.value == 'american' || t.value == 'italian' || t.value == 'breakfast' || t.value == 'polish' || t.value == 'oriental'));
      this.ads = this.allAds;
    });
  }

  selectionChanges(): void{
    const value = this.kitchen.value;
    if (value == 'all'){
      this.ads = this.allAds;
    }
    else{
      this.ads = this.allAds.filter(tag => tag.tags.find(t => t.value == value));
    }
  }

  getColor(value: string): string{

    switch (value){
      case 'american': case 'amerykańska': case 'italian':case 'włoska':case 'polish':case 'polska':case 'oriental':case 'orientalna':
        return 'light-blue';
      case 'fast-food':case 'breakfast': case 'śniadani':case 'obiad':case 'dinner':case 'deser':case 'dessert':
        return 'yellow';
      case 'meat':case 'mięso':case 'beef':case 'wołowina':case 'kurczak': case 'chicken':case 'schabowi':case 'wieprzowina':case 'pork':
      case 'egg':case 'jajka':case 'ser':case 'chees': case 'ryż':case 'rice':case 'ziemniaki': case 'potato':case 'makaron':case 'pasta':
        return 'red';
      case 'bean': case 'fasola': case 'banan': case 'banana': case 'pomidori': case 'tomato': case 'kapusta':
      case 'cabbag': case 'grzybi': case 'mushroom': case 'mak': case 'poppi': case 'oliwa': case 'oil':
        return 'green';

      case 'burger':case 'burrito':case 'naleśnik':case 'naleśniki': case 'pancak': case 'pancake':case 'jajecznica':case 'scrambl':case 'kanapki':
      case 'sandwich':case 'pizza':case 'risotto':case 'spaghetti': case 'spagetti':case 'drożdżówka':case 'bun':case 'kopytka':
      case 'hoov':case 'kluski': case 'noodl': case 'pierogi': case 'dumpl':case 'chop': case 'kotlet':
        return 'blue';

      case 'loaf': case 'bułka': case 'tortilla': case 'bread':case 'bake': case 'dough': case 'ciasto':
        return 'brown';
      default:
        return 'purple';
    }
  }

}
