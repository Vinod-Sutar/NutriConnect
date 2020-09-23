import { Component, OnInit } from '@angular/core';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  loadingIndex = -1;

  selectedCampaign = null;

  currentQuestionIndex = 0;

  constructor(private quizService: QuizService, private router: Router) { }

  // constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (localStorage.getItem("email")) {

      if (localStorage.getItem('selectedCampaign')) {

        this.getQuizData();
      }
      else {
  
        this.router.navigate(['/sections']);
      }
    }
    else {

      this.router.navigate(['/login']);
    }
  }

  getQuizData() {

    var retrievedObject = localStorage.getItem('selectedCampaign');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));

    this.selectedCampaign = JSON.parse(retrievedObject);

    this.loadNextUnappearedQuestion();

  }

  loadNextUnappearedQuestion() {

    let tempIndex = -1;

    this.selectedCampaign.questions.forEach((question, index) => {
      
      if (question.selected_answer_id == 0) {

        if (tempIndex == -1) {

          tempIndex = index;
        }
      }
    });

    if (tempIndex == -1) {

      this.router.navigate(['/sponsors']);
    }
    else {

      this.currentQuestionIndex = tempIndex;
    }

  }


  getAlphabet(charCode) {

    return String.fromCharCode(charCode);

  }

  answerSelected(answer, index) {

    let currentQuestion = this.selectedCampaign.questions[this.currentQuestionIndex];

    if (currentQuestion.server_answered != true) {

      this.loadingIndex = index;

      let payload = {
        'operation': "submit_answer",
        'campaign_id': this.selectedCampaign.campaign_id,
        'email': localStorage.getItem("email"),
        'question_id': currentQuestion.question_id,
        'answer_id': answer.answer_id
      }

      this.quizService.submitAnswer(payload).subscribe((response: any) => {

        console.log("response: ", response);

        if (response.status == 200) {

          currentQuestion.selected_answer_id = answer.answer_id;

          setTimeout(() => {

            localStorage.setItem('selectedCampaign', JSON.stringify(this.selectedCampaign))

            this.loadingIndex = -1;
            
            // if (this.currentQuestionIndex != this.selectedCampaign.questions.length - 1) {

            //   let nextQuestion = this.selectedCampaign.questions[this.currentQuestionIndex + 1];

            //   if (nextQuestion.selected_answer_id == 0) {

            //     this.currentQuestionIndex = this.currentQuestionIndex + 1;
            //   }
            //   else {

            //     this.loadNextUnappearedQuestion();
            //   }
            // }
            // else {

            //   this.loadNextUnappearedQuestion();
            // }

            this.nextButtonClicked();

          }, 2000);
        }
        else if (this.currentQuestionIndex == this.selectedCampaign.questions.length - 1) {

          this.loadNextUnappearedQuestion();
        }
      });

    }
  }

  logoutClicked() {

    document.getElementById("openTimeupPopupButton").click();
  }

  logout() {

    localStorage.removeItem("email");

    this.router.navigate(['/']);
  }

  homeClicked() {

    this.router.navigate(['/sections']);
  }

  previousButtonClicked(tempIndex) {

    // debugger;

    if (tempIndex > 0) {

      tempIndex--;

      if (tempIndex == 0) {

        if (this.selectedCampaign.questions[tempIndex].server_answered !=  true) {

          this.currentQuestionIndex--;
        }
      }
      else if (this.selectedCampaign.questions[tempIndex].server_answered ==  true) {

        this.previousButtonClicked(tempIndex);
      }
      else {

        this.currentQuestionIndex--;
      }
    }
  }

  nextButtonClicked() {
    
    // debugger;

    let tempIndex = this.currentQuestionIndex;

    if (tempIndex < this.selectedCampaign.questions.length) {

      tempIndex++;

      if (tempIndex == this.selectedCampaign.questions.length) {

        this.router.navigate(['/sponsors']);
      }
      else if (this.selectedCampaign.questions[tempIndex].server_answered ==  true) {
        
        this.currentQuestionIndex++;

        this.nextButtonClicked();
      }
      else {

        this.currentQuestionIndex++;
      }
    }
  }

  stripClicked(clickedIndex) {

    if (this.selectedCampaign.questions[clickedIndex].server_answered !=  true) {
      
      this.currentQuestionIndex = clickedIndex
    }
  }
}
