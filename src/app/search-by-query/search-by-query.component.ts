import { Component } from '@angular/core';
import { Ad } from '../models/ad';
import { AdsService } from '../services/ads.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-search-by-query',
  templateUrl: './search-by-query.component.html',
  styleUrls: ['./search-by-query.component.css']
})
export class SearchByQueryComponent {
  ads: Ad[] = [];
  lang = new FormControl('pl');
  count = new FormControl('1');
  query: string = '';


  constructor(private adsService: AdsService) { }

  search(): void{
    this.adsService.getByQuery(this.query, this.lang.value, this.count.value)
    .subscribe(results => this.ads = results);
  }
}
