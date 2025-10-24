import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  cartItemCount = 0;
  isMobileMenuOpen = false;
  searchQuery = '';

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(() => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isMobileMenuOpen = false;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Navigate to products page with search query
      console.log('Searching for:', this.searchQuery);
    }
  }
}
