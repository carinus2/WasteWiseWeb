import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegularUser } from '../../models/RegularUserDto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  isAdminPage: boolean = false;
  loginForm!: FormGroup;

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
  
      const user: RegularUser = { username, password };
  
      this.authService.login(user).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.jwt);
          const decoded: any = jwtDecode(response.jwt);
          if(decoded.roles[0]=== 'ROLE_USER')
            this.router.navigate(['/intro']);
              else 
          if(decoded.roles[0]=== 'ROLE_ADMIN')
            this.router.navigate(['/admin-dashboard']);
        },
        error: (err) => {
          console.error('Error during login', err);
        },
      });
  }
}