import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {SignupComponent} from "./pages/signup/signup.component";
import {IntroComponent} from "./pages/intro/intro.component";
import {TeamComponent} from "./pages/team/team.component";
import {FAQComponent} from "./pages/faq/faq.component";
import {HowtoComponent} from "./pages/howto/howto.component";
import {RecyclingPointsComponent} from "./pages/recycling-points/recycling-points.component";
import {RequestCollectorComponent} from "./pages/request-collector/request-collector.component";

const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'team', component: TeamComponent },
  { path: 'FAQ', component: FAQComponent },
  { path: 'howto', component: HowtoComponent },
  { path: 'recycling-points', component: RecyclingPointsComponent },
  { path: 'request-collector', component:RequestCollectorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
