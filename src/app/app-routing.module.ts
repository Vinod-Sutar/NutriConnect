import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SectionComponent } from './section/section.component';
import { QuizComponent } from './quiz/quiz.component';
import { SponsorsComponent } from './sponsors/sponsors.component';

const routes: Routes = [
  {path : "", component : HomeComponent},
  {path : "login", component : LoginComponent},
  {path : "section", component : SectionComponent},
  {path : "quiz", component : QuizComponent},
  {path : "sponsors", component : SponsorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
