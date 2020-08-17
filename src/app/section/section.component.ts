import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';

declare var $: any;

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  campaigns: any = [];
  questionList: any = [];

  constructor(private activatedrouts: ActivatedRoute, private router: Router,
    private quizService: QuizService) { }

  ngOnInit(): void {

    if (localStorage.getItem('email')) {

      this.loadCampaigns();
    }
    else {

      this.router.navigate(['/login']);
    }
  }
  loadCampaigns() {

    let payload = {
      'operation': "campaigns",
      'email' : localStorage.getItem('email')
    }

    this.quizService.getLogin(payload).subscribe((response: any) => {

      if (response.status == 200) {

        this.campaigns = response.campaigns;

        $('.square-div').height($('.square-div').width());
      }
    });

  }

  getUnappearedQuestionCount(campaign) {

    var count = 0;

    campaign.questions.forEach(question => {

      if (question.selected_answer_id == 0) {
        
        count++;
      }
    });

    return campaign.questions.length - count;
  }

  navigateToQuiz(campaign) {

    if (this.getUnappearedQuestionCount(campaign) == campaign.questions.length) {

      document.getElementById("openTimeupPopupButton").click();
    }
    else {

      localStorage.setItem('selectedCampaign', JSON.stringify(campaign))
  
      console.log(campaign);

      this.router.navigate(['/quiz']);
    }


  }

  logoutClicked() {

    document.getElementById("openLogoutPopupButton").click();
  }

  logout() {

    localStorage.removeItem("email");

    this.router.navigate(['/']);
  }
}
