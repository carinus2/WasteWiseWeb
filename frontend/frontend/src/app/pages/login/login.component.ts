import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegularUser } from '../../models/RegularUserDto';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  isAdminPage: boolean = false;
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
  
    if (username === 'admin' && password === 'admin') {
      console.log('Login as admin successful!');
      this.router.navigate(['/admin-dashboard']); 
    } else {
      const user: RegularUser = { username, password };
  
      this.authService.login(user).subscribe({
        next: (response) => {
          this.router.navigate(['/intro']);
        },
        error: (err) => {
          console.error('Error during login', err);
        },
      });
    }
  }
}