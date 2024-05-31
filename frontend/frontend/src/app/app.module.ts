import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FAQComponent } from './pages/faq/faq.component';
import { HowtoComponent } from './pages/howto/howto.component';
import {CommonModule} from "@angular/common";
import { RecyclingPointsComponent } from './pages/recycling-points/recycling-points.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RequestCollectorComponent } from './pages/request-collector/request-collector.component';  

import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { JwtInterceptor } from './auth.interceptor';
import { HttpIntercept } from './http.interceptor';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { CashPaymentConfirmationComponent } from './pages/cash-payment-confirmation/cash-payment-confirmation.component';
import { CollectorMapComponent } from './pages/collector-map/collector-map.component';


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
    TeamComponent,
    FAQComponent,
    HowtoComponent,
    RecyclingPointsComponent,
    RequestCollectorComponent,
    TeamComponent,
    AdminComponentComponent,
    AdminSettingsComponent,
    ForbiddenComponent,
    CashPaymentConfirmationComponent,
    CollectorMapComponent
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
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    TabMenuModule,
    TabViewModule,
    AvatarModule,
    BadgeModule
  ],
  providers: [
    provideHttpClient(withFetch()), 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
