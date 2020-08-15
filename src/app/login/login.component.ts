import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isChecked = false;

  loginForm: FormGroup;

  loginObj: any;

  showDoctorNameError = false;

  showEmailError = false;

  showStateError = false;

  showConsentError = false;

  constructor(private formBuilder: FormBuilder, private activatedrouts: ActivatedRoute,
    private router: Router, private quizService: QuizService
    // , private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      doctorName: [],
      emailId: [],
      state: ['0'],
      mobile: []
    })
  }

  onCheckboxChange(event) {

    this.isChecked = event.target.checked;
  }

  navigateToSection() {

    this.showDoctorNameError = false;

    this.showEmailError = false;

    this.showStateError = false;

    this.showConsentError = false;

    if (this.loginForm.controls['doctorName'].value == null || this.loginForm.controls['doctorName'].value.length == 0) {

      this.showDoctorNameError = true;
    }
    if (this.loginForm.controls['emailId'].value == null || this.loginForm.controls['emailId'].value.length == 0) {

      this.showEmailError = true;
    }

    if (this.loginForm.controls['state'].value == 0) {

      this.showStateError = true;
    }

    if (this.isChecked == false) {

      this.showConsentError = true;
    }

    if (this.showDoctorNameError == false && this.showEmailError == false && this.showStateError == false && this.showConsentError == false) {

      let payload = {
        'operation': "login",
        'doctor_name': this.loginForm.controls['doctorName'].value,
        'email': this.loginForm.controls['emailId'].value,
        'mobile': this.loginForm.controls['mobile'].value,
        'state': this.loginForm.controls['state'].value

      }
      this.quizService.getLogin(payload).subscribe((response: any) => {
        if (response.status == 200) {
          let loginInfo = response;
          this.router.navigate(['/section']);
          localStorage.setItem('emailId', this.loginForm.controls['emailId'].value);
        };
      });
    }



    // this.router.navigate(['/section']);
  }
}
