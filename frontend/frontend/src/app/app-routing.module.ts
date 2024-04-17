import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {SignupComponent} from "./pages/signup/signup.component";
import {IntroComponent} from "./pages/intro/intro.component";
import {TeamComponent} from "./pages/team/team.component";
import {FAQComponent} from "./pages/faq/faq.component";
import {HowtoComponent} from "./pages/howto/howto.component";

const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'team', component: TeamComponent },
  { path: 'FAQ', component: FAQComponent },
  { path: 'howto', component: HowtoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
