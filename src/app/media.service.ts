import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }
  
  updateUser(data: any) {

    // data = {};

    return this.http.post("https://api.ciplanutriconnect.in", data);
  }
}
