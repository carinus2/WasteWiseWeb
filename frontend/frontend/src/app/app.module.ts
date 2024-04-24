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
import { FAQComponent } from './pages/faq/faq.component';
import { HowtoComponent } from './pages/howto/howto.component';
import {CommonModule} from "@angular/common";
import { RecyclingPointsComponent } from './pages/recycling-points/recycling-points.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RequestCollectorComponent } from './pages/request-collector/request-collector.component';  // Importă FormsModule


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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    CommonModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
