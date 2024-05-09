import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { IntroComponent } from './pages/intro/intro.component';
import { TeamComponent } from './pages/team/team.component';
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FAQComponent } from './pages/faq/faq.component';
import { HowtoComponent } from './pages/howto/howto.component';
import {CommonModule} from "@angular/common";
import { RecyclingPointsComponent } from './pages/recycling-points/recycling-points.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RequestCollectorComponent } from './pages/request-collector/request-collector.component';  // Importă FormsModule

import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

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
    UserEditComponent,
    TeamComponent,
    FAQComponent,
    HowtoComponent,
    RecyclingPointsComponent,
    RequestCollectorComponent,
    TeamComponent,
    AdminComponentComponent,
    AdminSettingsComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    BrowserAnimationsModule,
    TableModule,
    DialogModule,
    TabMenuModule,
    TabViewModule,
    AvatarModule,
    BadgeModule,
    BrowserAnimationsModule,
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    DialogModule,
    TabMenuModule,
    TabViewModule,
    AvatarModule,
    BadgeModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
