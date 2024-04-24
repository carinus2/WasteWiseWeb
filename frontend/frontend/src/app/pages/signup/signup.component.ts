import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationUserDto } from '../../models/RegistrationUserDto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] 
})
export class SignupComponent{
isAdminPage: boolean = false;
  signUpForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      homeAddress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  signUp(): void {

    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    const phoneNumber = this.signUpForm.get('phone')?.value;
    const firstName = this.signUpForm.get('firstName')?.value;
    const lastName = this.signUpForm.get('lastName')?.value;
    const homeAddress = this.signUpForm.get('homeAddress')?.value;


    const user: Omit<RegistrationUserDto, 'id'> = {
      email,
      password,
      phoneNumber,
      firstName,
      lastName,
      homeAddress,
    };
    this.authService.signUp(user).subscribe({
      next: (response) => {
        console.log('SignUp successful, response:', response);
        this.router.navigate(['/intro']).then(success => {
          if (!success) {
            console.error('Redirection to /intro failed');
          }
        });
      },
      error: (err) => {
        console.error('Error during sign up', err);
      }
    });
  }}