import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SectionComponent } from './section/section.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizService } from '../app/quiz.service'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { SponsorsComponent } from './sponsors/sponsors.component';
// import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SectionComponent,
    QuizComponent,
    SponsorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    // ToastrModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
