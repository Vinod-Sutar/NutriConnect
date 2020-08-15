import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';

declare  var $:any;

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  campaigns:any = [];
  questionList:any = [];

  constructor(private activatedrouts: ActivatedRoute,private router: Router,
    private quizService : QuizService) { }

  ngOnInit(): void {
    this.loadCampaigns();
  }
  loadCampaigns(){
    let payload = {
      'operation' :"campaigns",
    }
    this.quizService.getLogin(payload).subscribe((response: any) => {
      if(response.status == 200){
        this.campaigns = response.campaigns;
        
        console.log("response", response);
        console.log("this.questionList", this.questionList);
        
        $('.square-div').height($('.square-div').width());

      }});

  }

  navigateToQuiz(campaign){
    this.router.navigate(['/quiz']);
    localStorage.setItem('selectedCampaign', JSON.stringify(campaign))
    console.log(campaign);
    
  }
}
