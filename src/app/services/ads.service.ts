import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ad } from '../models/ad';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  baseUrl: string = 'http://127.0.0.1:5000/api/';

  constructor(private http: HttpClient) { }

  getAll(count: number = 100): Observable<Ad[]>{
    const url = this.baseUrl + "all?count=" + count;
    return this.http.get<Ad[]>(url);
  }

  getByQuery(query: string, lang: string = 'pl', count: number = 100): Observable<Ad[]>{
    const url = this.baseUrl + "byQuery?query=" + query + "&count=" + count + "&lang=" + lang;
    return this.http.get<Ad[]>(url);
  }

  getById(adId: number): Observable<Ad>{
    const url = this.baseUrl + "byId?id=" + adId;
    return this.http.get<Ad>(url);
  }

  updateAd(adId: number, updated: Ad): Observable<Ad>{
    const url = this.baseUrl + "update?id=" + adId;
    const headers = { 'content-type': 'application/json'} 
    return this.http.post<Ad>(url, updated, {headers: headers});
  }

  createAd(created: Ad): Observable<Ad>{
    const url = this.baseUrl + "create";
    const headers = { 'content-type': 'application/json'} 
    return this.http.post<Ad>(url, created, {headers: headers});
  }

  removeAd(adId: number): Observable<boolean>{
    const url = this.baseUrl + "remove?id=" + adId;
    return this.http.post<boolean>(url, {});
  }
}
