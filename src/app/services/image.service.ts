import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://127.0.0.1:5000/api/image/'

  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<string>{
    const url = this.baseUrl + 'upload';
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<string>(url, formData);
  }
}
