import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { User, Address } from '../../models/user.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  orders: Order[] = [];
  currentOrders: Order[] = [];
  pastOrders: Order[] = [];
  activeTab: 'profile' | 'orders' | 'addresses' = 'profile';
  activeBottomTab: string = 'profile';
  
  // Edit states
  isEditingProfile: boolean = false;
  isAddingAddress: boolean = false;
  editingAddressId: string | null = null;
  
  // Form data
  profileForm = {
    name: '',
    email: '',
    phone: ''
  };
  
  addressForm: Address = {
    id: '',
    type: 'home',
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    isDefault: false
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadOrders();
  }

  loadUserData(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.profileForm = {
          name: user.name,
          email: user.email,
          phone: user.phone
        };
      }
    });
  }

  loadOrders(): void {
    if (this.user) {
      this.orderService.getOrders(this.user.id).subscribe(orders => {
        this.orders = orders;
        this.currentOrders = orders.filter(o => 
          ['pending', 'confirmed', 'processing', 'shipped'].includes(o.orderStatus)
        );
        this.pastOrders = orders.filter(o => 
          ['delivered', 'cancelled'].includes(o.orderStatus)
        );
      });
    }
  }

  setTab(tab: 'profile' | 'orders' | 'addresses'): void {
    this.activeTab = tab;
  }

  setBottomTab(tab: string): void {
    this.activeBottomTab = tab;
  }

  // Profile Management
  startEditProfile(): void {
    this.isEditingProfile = true;
  }

  cancelEditProfile(): void {
    this.isEditingProfile = false;
    if (this.user) {
      this.profileForm = {
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone
      };
    }
  }

  saveProfile(): void {
    if (this.user) {
      this.userService.updateProfile(this.profileForm).subscribe(updatedUser => {
        this.user = updatedUser;
        this.isEditingProfile = false;
      });
    }
  }

  // Address Management
  startAddAddress(): void {
    this.isAddingAddress = true;
    this.addressForm = {
      id: '',
      type: 'home',
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      isDefault: false
    };
  }

  startEditAddress(address: Address): void {
    this.editingAddressId = address.id;
    this.addressForm = { ...address };
  }

  cancelAddressEdit(): void {
    this.isAddingAddress = false;
    this.editingAddressId = null;
  }

  saveAddress(): void {
    if (this.user) {
      if (this.editingAddressId) {
        // Update existing address
        this.userService.updateAddress(this.editingAddressId, this.addressForm).subscribe(updatedAddress => {
          if (this.user) {
            const index = this.user.addresses.findIndex(a => a.id === this.editingAddressId);
            if (index !== -1) {
              this.user.addresses[index] = updatedAddress;
            }
          }
          this.editingAddressId = null;
        });
      } else {
        // Add new address
        const { id, ...addressData } = this.addressForm;
        this.userService.addAddress(addressData).subscribe(newAddress => {
          if (this.user) {
            this.user.addresses.push(newAddress);
          }
          this.isAddingAddress = false;
        });
      }
    }
  }

  deleteAddress(addressId: string): void {
    if (this.user && confirm('Are you sure you want to delete this address?')) {
      this.userService.deleteAddress(addressId).subscribe(success => {
        if (success && this.user) {
          this.user.addresses = this.user.addresses.filter(a => a.id !== addressId);
        }
      });
    }
  }

  setDefaultAddress(addressId: string): void {
    if (this.user) {
      this.userService.setDefaultAddress(addressId).subscribe(success => {
        if (success && this.user) {
          this.user.addresses.forEach(a => a.isDefault = (a.id === addressId));
        }
      });
    }
  }

  // Order Management
  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'pending': 'warning',
      'confirmed': 'info',
      'processing': 'info',
      'shipped': 'info',
      'delivered': 'success',
      'cancelled': 'error'
    };
    return colors[status] || 'gray';
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
    }
  }
}
