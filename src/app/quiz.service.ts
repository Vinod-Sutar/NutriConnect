import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }
  
  getLogin(data: any) {

    return this.http.post("https://api.ciplanutriconnect.in", data);
  }

  submitAnswer(data: any) {

    return this.http.post("https://api.ciplanutriconnect.in", data);
  }
}
