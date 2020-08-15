import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  selectedCampaign = null;
  currentQuestionIndex = 0;
  constructor() { }

  ngOnInit(): void {

    this.getQuizData();
  }

  getQuizData(){

    var retrievedObject = localStorage.getItem('selectedCampaign');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));

    this.selectedCampaign = JSON.parse(retrievedObject);
    
  }
}
