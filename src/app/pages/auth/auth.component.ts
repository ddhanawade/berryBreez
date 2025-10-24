import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  // Form data
  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.resetForms();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  resetForms() {
    this.loginData = { email: '', password: '' };
    this.registerData = { name: '', email: '', phone: '', password: '', confirmPassword: '' };
  }

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Please fill in all fields');
      return;
    }

    this.isLoading = true;
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', 'User');
      this.router.navigate(['/']);
    }, 1500);
  }

  onRegister() {
    if (!this.registerData.name || !this.registerData.email || 
        !this.registerData.phone || !this.registerData.password || 
        !this.registerData.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.registerData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    this.isLoading = true;
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', this.registerData.name);
      this.router.navigate(['/']);
    }, 1500);
  }

  loginWithDemo() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', 'Demo User');
      this.router.navigate(['/']);
    }, 1000);
  }
}
