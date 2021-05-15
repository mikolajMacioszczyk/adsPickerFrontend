import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ad } from '../models/ad';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  mockAds: Ad[] = [
    {id: 1, title: 'title1', description: 'desc1', imagePath: 'path1', tags: []}, 
    {id: 2, title: 'title2', description: 'desc2', imagePath: 'path2', tags: []}, 
    {id: 3, title: 'title3', description: 'desc3', imagePath: 'path3', tags: []} 
  ]

  constructor() { }

  getAll(): Observable<Ad[]>{
    return of(this.mockAds);
  }

  getByQuery(query: string): Observable<Ad[]>{
    return of(this.mockAds);
  }

  getById(adId: number): Observable<Ad>{
    return of(this.mockAds[0]);
  }

  updateAd(adId: number, updated: Ad): Observable<boolean>{
    return of(true);
  }

  createAd(created: Ad): Observable<boolean>{
    return of(true);
  }

  deleteAd(adId: number): Observable<boolean>{
    return of(true);
  }
}
