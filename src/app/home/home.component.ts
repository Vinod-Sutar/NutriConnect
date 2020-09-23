import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isChecked = false;

  loginForm: FormGroup;

  loginObj: any;

  showDoctorNameError: string = null;

  showEmailError: string = null;

  showRegistrationNoError: string = null;

  showStateError: string = null;

  showConsentError: string = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      doctorName: [],
      emailId: [],
      state: ['0'],
      mobile: [],
      registrationNo: []
    })
  }

  onCheckboxChange(event) {

    this.isChecked = event.target.checked;
  }

  navigateToSection() {

    this.showDoctorNameError = null;

    this.showEmailError = null;

    this.showRegistrationNoError = null;

    this.showStateError = null;

    this.showConsentError = null;

    if (this.loginForm.controls['doctorName'].value == null || this.loginForm.controls['doctorName'].value.length == 0) {

      this.showDoctorNameError = "Doctor name required";
    }

    if (this.loginForm.controls['emailId'].value == null || this.loginForm.controls['emailId'].value.length == 0) {

      this.showEmailError = "Email required";
    }
    else if (this.validateEmail(this.loginForm.controls['emailId'].value) == false) {

      this.showEmailError = "Invalid email address";
    }

    if (this.loginForm.controls['state'].value == 0) {

      this.showStateError = "State required";
    }

    if (this.loginForm.controls['registrationNo'].value == null || this.loginForm.controls['registrationNo'].value.length == 0) {

      this.showRegistrationNoError = "Registration number required";
    }

    if (this.isChecked == false) {

      this.showConsentError = "Consent required";
    }

    if (this.showDoctorNameError == null && this.showEmailError == null && this.showStateError == null && this.showRegistrationNoError == null && this.showConsentError == null) {

      let payload = {
        'operation': "login",
        'doctor_name': this.loginForm.controls['doctorName'].value,
        'email': this.loginForm.controls['emailId'].value,
        'mobile': this.loginForm.controls['mobile'].value,
        'registrationNo': this.loginForm.controls['registrationNo'].value,
        'state': this.loginForm.controls['state'].value

      }
      this.quizService.getLogin(payload).subscribe((response: any) => {
        if (response.status == 200) {
          let loginInfo = response;
          this.router.navigate(['/sections']);
          localStorage.setItem('email', this.loginForm.controls['emailId'].value);
        };
      });
    }
  }


  validateEmail(email) {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  }

  navigateToLogin(){
      this.router.navigate(['/login']);
  }
}
