import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private url = 'https://vision.googleapis.com/v1/images:annotate?key=' + environment.visionApi.apiKey;

  constructor(private http: HttpClient) { }

  public postVisionApiData(data) {
    return this.http.post(this.url , data);
  }
}
