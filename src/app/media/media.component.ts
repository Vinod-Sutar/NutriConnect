import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  logged = false;

  serverResponse = null;

  logRetryAttempt = 0;

  showVideoRetryAttempt = 0;

  screenHeight: any;

  selectedMedia = null;

  showUserTypeError = null;

  showUserNameError = null;

  showInvalidPasswordError = null;

  showStateError = null;

  password = "";

  sessionId = '';

  mediaId = '';

  mediaForm: FormGroup;
  
  medias: any;

  // medias = [
  //   {
  //     mediaId: "nutritionduringpregnancy",
  //     name: "Nutrition During Pregnancy",
  //     password: "cpink@folinine",
  //     video_path: "https://api.ciplanutriconnect.in/patientedu/nutritionduringpregnancy.mp4"
  //   },
  //   {
  //     mediaId: "selfcareduringpregnancy",
  //     name: "Self Care During Pregnancy",
  //     password: "cpink@folinine",
  //     video_path: "https://api.ciplanutriconnect.in/patientedu/selfcareduringpregnancy.mp4"
  //   }
  // ]

  constructor(
    private mediaService: MediaService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.medias = this.mediaService.getMedias();

    this.mediaForm = this.formBuilder.group({
      userType: ['', Validators.required],
      userName: [],
      state: ['0'],
      password: [],
    })

    this.mediaId = this.activatedRoute.snapshot.params.mediaId;

    this.screenHeight = window.innerHeight;

    this.medias.forEach(media => {

      if (media.mediaId == this.mediaId) {
        this.selectedMedia = media;
      }
    });

    if (this.selectedMedia) {

      this.sessionId = this.randomString();

      this.loadMedia();
    }


    this.onResize(null);
  }


  randomString(): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const stringLength = 10;
    let randomstring = '';
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
  }

  loadMedia(): void {

    let deviceId = localStorage.getItem('deviceId');

    if (deviceId == null) {

      deviceId = this.randomString();

      localStorage.setItem('deviceId', deviceId);
    }


    let payload = {
      'operation': 'media',
      'deviceId': deviceId,
      'sessionId': this.sessionId,
      'mediaId': this.mediaId,
      'userType': null,
      'name': null,
      'state': null
    }

    this.mediaService.updateUser(payload).subscribe((response: any) => {

      console.log("mediaService response: ", response);

      if (response.status == 200) {
        this.logged = true;
      }
      else {

        if (this.logRetryAttempt < 10) {

          this.logRetryAttempt++;

          this.loadMedia();
        }
        else {
          this.serverResponse = response.message;
        }
      }

    });
  }

  submitClicked(password) {

    this.showUserTypeError = null;

    this.showUserNameError = null;

    this.showStateError = null;

    this.showInvalidPasswordError = null;

    console.log(password);

    var valid = true;

    if (this.mediaForm.controls['userType'].value == null || this.mediaForm.controls['userType'].value.trim().length == 0) {

      this.showUserTypeError = "Please select any of the option";
      valid = false;
    }

    if (this.mediaForm.controls['userName'].value == null || this.mediaForm.controls['userName'].value.trim().length == 0) {

      this.showUserNameError = "Please enter your full name";
      valid = false;
    }


    if (this.mediaForm.controls['state'].value == 0) {

      this.showStateError = "Please select state";
      valid = false;
    }

    if (this.mediaForm.controls['password'].value == null || this.mediaForm.controls['password'].value.trim().length == 0) {

      this.showInvalidPasswordError = "Please enter password";
      valid = false;
    }

    if (valid == true) {
      if (this.selectedMedia.password == password) {
        this.showVideo(password);
      }
      else {
        this.showInvalidPasswordError = "You have entered incorrect password";
      }
    }
  }


  showVideo(password: string): void {

    let deviceId = localStorage.getItem('deviceId');

    if (deviceId == null) {

      deviceId = this.randomString();

      localStorage.setItem('deviceId', deviceId);
    }

    let payload = {
      'operation': 'media',
      'deviceId': deviceId,
      'sessionId': this.sessionId,
      'mediaId': this.mediaId,
      'userType': this.mediaForm.controls['userType'].value,
      'name': this.mediaForm.controls['userName'].value,
      'state': this.mediaForm.controls['state'].value
    }

    this.mediaService.updateUser(payload).subscribe((response: any) => {

      console.log("showVideo response: ", response);

      if (response.status == 200) {

        this.password = password;
      }
      else {

        if (this.showVideoRetryAttempt < 10) {

          this.showVideoRetryAttempt++;

          this.showVideo(password);
        }
        else {

          this.serverResponse = response.message;
        }
      }

    });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {

    var body = document.body,
      html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

    this.screenHeight = height;
    document.getElementById('main-body').style.minHeight = this.screenHeight;
    console.log("window.innerHeight: " + window.innerHeight);
  }

}
