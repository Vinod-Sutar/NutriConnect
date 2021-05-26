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

  getMediaNameById(mediaId: string) : string {

    var medias = [
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
        video_path: "https://api.ciplanutriconnect.in/patientedu/selfcareduringpregnancy.mp4"
      }
    ];

    var mediaName = '';

    medias.forEach(media => {
      if (media.mediaId == mediaId) {
        mediaName = media.name;
      }
    });

    return mediaName;
  }
}
