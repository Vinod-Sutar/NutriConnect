import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';
import { ExcelService } from '../excel.service';

declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  users = null;
  campaigns = null;
  questionList: any = [];

  constructor(private activatedrouts: ActivatedRoute, private router: Router,
    private quizService: QuizService, private excelService: ExcelService) { }

  ngOnInit(): void {

    this.loadUsers();

    this.loadCampaigns();

    // if (localStorage.getItem('email')) {

    //   this.loadCampaigns();
    // }
    // else {

    //   this.router.navigate(['/login']);
    // }
  }


  loadUsers() {

    let payload = {
      'operation': "users_report",
    }

    this.quizService.report(payload).subscribe((response: any) => {

      if (response.status == 200) {

        this.users = response.users;
      }
    });

  }

  loadCampaigns() {

    let payload = {
      'operation': "detailed_report",
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


    localStorage.setItem('selectedReportCampaign', JSON.stringify(campaign))

    this.router.navigate(['/detail-reports']);


    // if (this.getUnappearedQuestionCount(campaign) == campaign.questions.length) {

    //   document.getElementById("openTimeupPopupButton").click();
    // }
    // else {

    //   localStorage.setItem('selectedCampaign', JSON.stringify(campaign))

    //   console.log(campaign);

    //   this.router.navigate(['/quiz']);
    // }
  }

  logoutClicked() {

    document.getElementById("openLogoutPopupButton").click();
  }

  logout() {

    localStorage.removeItem("email");

    this.router.navigate(['/']);
  }

  downloadExcel() {

    var xrow = new Array();

    var header = new Array();

    header.push('Section');
    header.push('Questions');
    header.push('User count');
    header.push('Percentage');
    xrow.push(header)

    this.campaigns.forEach(campaign => {



      campaign.questions.forEach(questions => {

        var xquestions = new Array();

        if (campaign.questions[0] == questions) {

          xquestions.push(campaign.campaign_name);
        }
        else {

          xquestions.push('');
        }


        xquestions.push(questions.question);

        xrow.push(xquestions)

        questions.answers.forEach(answers => {

          var xanswers = new Array();

          xanswers.push('');
          xanswers.push(answers.answer);
          xanswers.push(answers.count + '/' + questions.count);
          xanswers.push((answers.count/questions.count*100).toFixed(2) + '%');

          xrow.push(xanswers)
        });

        xrow.push([])

      });

    });

    this.excelService.exportAsExcelFile(xrow, 'Report');
  }

  downloadUsersExcel() {

    var usersArray = new Array();

    usersArray.push(["Sr.No.", "Doctor", "Email", "Mobile", "Registration number", "State", "Created at", "Last logged in at"]);


    this.users.forEach(user => {
      
      var userObj = new Array();

      userObj.push(user.id)
      userObj.push(user.doctor_name)
      userObj.push(user.email)
      userObj.push(user.mobile)
      userObj.push(user.registration_no)
      userObj.push(user.state)
      userObj.push(user.created_at)
      userObj.push(user.updated_at)

      usersArray.push(userObj);
    });

    this.excelService.exportAsExcelFile(usersArray, 'UsersReport');
  }
}
