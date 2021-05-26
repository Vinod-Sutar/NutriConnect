import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { SectionComponent } from './section/section.component';
// import { QuizComponent } from './quiz/quiz.component';
// import { SponsorsComponent } from './sponsors/sponsors.component';
// import { ReportsComponent } from './reports/reports.component';
// import { DetailReportComponent } from './detail-report/detail-report.component';
// import { MediaComponent } from './media/media.component';
// import { MediaReportComponent } from './media-report/media-report.component';


import { QuizService } from '../app/quiz.service'
import { ExcelService } from './excel.service';
import { MediaService } from './media.service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
    // ToastrModule
  ],
  providers: [QuizService, ExcelService, MediaService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
