import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }
  //  getAllData() {
  //   return this.http.get("https://new-2019.in/api/reports/");
  //   }

    getLogin(data:any) {
      return this.http.post("https://api.ciplanutriconnect.in", data);
      }
}
