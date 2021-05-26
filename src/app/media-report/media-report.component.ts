import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-media-report',
  templateUrl: './media-report.component.html',
  styleUrls: ['./media-report.component.css']
})
export class MediaReportComponent implements OnInit {

  loading = false;

  loadRetryAttempt = 0;

  serverResponse = null;

  report = null;

  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    
    this.loadReport();
  }


  loadReport(): void {

    let payload = {
      'operation': 'media-report'
    }

    this.mediaService.updateUser(payload).subscribe((response: any) => {

      console.log("mediareport response: ", response);
      
      this.loading = false;

      if (response.status == 200) {
        
        this.report = response.report;
      }
      else {

        if (this.loadRetryAttempt < 10) {

          this.loadRetryAttempt++;
            
          this.loadReport()
        }
        else {
          this.serverResponse = response.message;
        }
      }
    });
  }
}
