import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
})
export class DetailReportComponent implements OnInit {

  showDetail = false;

  selectedCampaign = null;

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {


    var retrievedObject = localStorage.getItem('selectedReportCampaign');

    if (retrievedObject) {

      console.log('retrievedObject: ', JSON.parse(retrievedObject));

      this.selectedCampaign = JSON.parse(retrievedObject);
    }
    else {

      this.router.navigate(['/reports']);
    }
  }

  getAlphabet(charCode) {

    return String.fromCharCode(charCode);
  }
}