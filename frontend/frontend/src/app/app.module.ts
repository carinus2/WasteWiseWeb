import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { IntroComponent } from './pages/intro/intro.component';
import { TeamComponent } from './pages/team/team.component';
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { TableModule } from 'primeng/table';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    IntroComponent,
    TeamComponent,
    AdminComponentComponent,
    AdminSettingsComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
