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
      console.log(ads);
      this.allAds = ads.filter(tag => tag.tags.find(t => 
      t.value == 'american' || t.value == 'italian' || t.value == 'breakfast' || t.value == 'polish' || t.value == 'oriental' || t.value == 'dessert'));
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
      case 'fast-food':case 'fast':case 'breakfast': case 'śniadanie':case 'obiad':case 'dinner':case 'deser':case 'dessert':
      case 'przekąska': case 'snack': case 'main': case 'główne': case 'sos': case 'sauce': case 'appetizer': case 'przystawka':
        return 'yellow';
      case 'meat':case 'mięso':case 'beef':case 'wołowina':case 'kurczak': case 'chicken':case 'schabowy':case 'wieprzowina':case 'pork':
      case 'eggs':case 'jajka':case 'ser':case 'cheese': case 'chees': case 'ryż':case 'rice':case 'ziemniaki': case 'potatoes':
      case 'makaron':case 'pasta': case 'fish': case 'ryba': case 'salmon': case 'łosoś':
        return 'red';
      case 'bean': case 'fasola': case 'banan': case 'banana': case 'pomidory': case 'tomatoes': case 'kapusta': case 'cebula': case 'onion':
      case 'cabbage': case 'grzyby': case 'mushrooms': case 'mak': case 'poppy': case 'oliwa': case 'oil':
        return 'green';

      case 'burger':case 'burrito':case 'naleśnik':case 'naleśniki': case 'pancak': case 'pancakes':case 'jajecznica':case 'scrambled':case 'kanapki':
      case 'sandwich': case 'sandwiches':case 'pizza':case 'risotto':case 'spaghetti': case 'spagetti':case 'drożdżówka':case 'bun':case 'kopytka':
      case 'hooves':case 'kluski': case 'noodles': case 'pierogi': case 'dumplings':case 'chop': case 'kotlet': case 'vegetables': case 'warzywa': 
      case 'marmalade': case 'marmolada': case 'paprica': case 'papryka':
        return 'olive';

      case 'loaf': case 'bułka': case 'tortilla': case 'bread':case 'bake': case 'baking': case 'pieczywo': case 'dough': case 'ciasto':
        return 'brown';

      case 'ciepło':case 'hot':case 'cold': case 'zimno':
        return 'blue';

      default:
        return 'purple';
      }
  }

}
