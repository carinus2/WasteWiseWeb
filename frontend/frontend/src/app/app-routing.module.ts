import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from "./pages/signup/signup.component";
import { IntroComponent } from "./pages/intro/intro.component";
import { TeamComponent } from "./pages/team/team.component";
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'team', component: TeamComponent },
  { path: "admin-dashboard", component: AdminComponentComponent},
  { path: "admin-settings", component: AdminSettingsComponent},
  { path: 'regular-users/:id', component: UserEditComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
