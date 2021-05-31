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

  getMedias() {

    return [
      {
        mediaId: "nutritionduringpregnancy",
        name: "Nutrition During Pregnancy",
        password: "cpink@folinine",
        video_path: "https://api.ciplanutriconnect.in/patientedu/nutritionduringpregnancy.mp4"
      },
      {
        mediaId: "selfcareduringpregnancy",
        name: "Self Care During Pregnancy",
        password: "cpink@folinine",
        video_path: "https://api.ciplanutriconnect.in/patientedu/self_care_during_pregnancy.mp4"
      },
      {
        mediaId: "symptomsduringpregnancy",
        name: "Signs & Symptoms During Pregnancy",
        password: "cpink@folinine",
        video_path: "https://api.ciplanutriconnect.in/patientedu/signs_and_symptoms_during_pregnancy.mp4"
      }
    ];
  }

  getMediaNameById(mediaId: string) : string {

    var mediaName = '';

    this.getMedias().forEach(media => {
      if (media.mediaId == mediaId) {
        mediaName = media.name;
      }
    });

    return mediaName;
  }
}
