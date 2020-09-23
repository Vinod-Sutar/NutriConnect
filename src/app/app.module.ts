import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizService } from '../app/quiz.service'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SectionComponent } from './section/section.component';
import { QuizComponent } from './quiz/quiz.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { ReportsComponent } from './reports/reports.component';
import { DetailReportComponent } from './detail-report/detail-report.component';

import { ExcelService } from './excel.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SectionComponent,
    QuizComponent,
    SponsorsComponent,
    ReportsComponent,
    DetailReportComponent
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
  providers: [QuizService, ExcelService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
