import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  currentStep: number = 1;
  checkoutForm!: FormGroup;
  
  // Cart data
  cartItems: CartItem[] = [
    {
      id: '1',
      name: 'Fresh Strawberries',
      price: 250,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400'
    },
    {
      id: '2',
      name: 'Organic Apples',
      price: 180,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400'
    }
  ];

  // Saved addresses
  savedAddresses: Address[] = [
    {
      id: '1',
      name: 'Home',
      phone: '+91 9876543210',
      addressLine1: '123 Main Street, Apartment 4B',
      addressLine2: 'Near City Mall',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    }
  ];

  selectedAddress: Address | null = null;
  selectedPaymentMethod: string = '';
  isProcessing: boolean = false;
  showAddressForm: boolean = false;

  // Payment methods
  paymentMethods = [
    { id: 'upi', name: 'UPI', icon: 'upi', popular: true },
    { id: 'card', name: 'Credit/Debit Card', icon: 'card', popular: true },
    { id: 'netbanking', name: 'Net Banking', icon: 'bank', popular: false },
    { id: 'wallet', name: 'Wallet', icon: 'wallet', popular: false },
    { id: 'cod', name: 'Cash on Delivery', icon: 'cash', popular: true }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
    if (this.savedAddresses.length > 0) {
      this.selectedAddress = this.savedAddresses[0];
    }
  }

  initForms(): void {
    this.checkoutForm = this.fb.group({
      // Address fields
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      
      // Payment fields
      cardNumber: [''],
      cardName: [''],
      expiryDate: [''],
      cvv: [''],
      upiId: ['']
    });
  }

  // Step navigation
  goToStep(step: number): void {
    if (step === 2 && !this.selectedAddress) {
      return;
    }
    if (step === 3 && !this.selectedPaymentMethod) {
      return;
    }
    this.currentStep = step;
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Address management
  selectAddress(address: Address): void {
    this.selectedAddress = address;
  }

  toggleAddressForm(): void {
    this.showAddressForm = !this.showAddressForm;
  }

  saveNewAddress(): void {
    if (this.checkoutForm.valid) {
      const newAddress: Address = {
        id: Date.now().toString(),
        name: 'New Address',
        phone: this.checkoutForm.value.phone,
        addressLine1: this.checkoutForm.value.addressLine1,
        addressLine2: this.checkoutForm.value.addressLine2,
        city: this.checkoutForm.value.city,
        state: this.checkoutForm.value.state,
        pincode: this.checkoutForm.value.pincode,
        isDefault: false
      };
      this.savedAddresses.push(newAddress);
      this.selectedAddress = newAddress;
      this.showAddressForm = false;
      this.checkoutForm.reset();
    }
  }

  // Payment
  selectPaymentMethod(methodId: string): void {
    this.selectedPaymentMethod = methodId;
  }

  // Order summary calculations
  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get deliveryFee(): number {
    return this.subtotal > 500 ? 0 : 40;
  }

  get tax(): number {
    return Math.round(this.subtotal * 0.05);
  }

  get total(): number {
    return this.subtotal + this.deliveryFee + this.tax;
  }

  // Place order
  placeOrder(): void {
    if (!this.selectedAddress || !this.selectedPaymentMethod) {
      return;
    }

    this.isProcessing = true;

    // Simulate payment processing
    setTimeout(() => {
      this.isProcessing = false;
      // Navigate to order confirmation
      this.router.navigate(['/orders']);
    }, 2000);
  }

  // Helper method
  getPaymentMethodName(methodId: string): string {
    const method = this.paymentMethods.find(m => m.id === methodId);
    return method ? method.name : '';
  }
}
