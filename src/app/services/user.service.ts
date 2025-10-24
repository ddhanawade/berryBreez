import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, Address } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.userSubject.next(user);
    });
  }

  updateProfile(updates: Partial<User>): Observable<User> {
    const currentUser = this.userSubject.value;
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    const updatedUser = { ...currentUser, ...updates, updatedAt: new Date() };
    
    return of(updatedUser).pipe(
      delay(500),
      map(user => {
        this.userSubject.next(user);
        localStorage.setItem('berrybreez_user', JSON.stringify(user));
        return user;
      })
    );
  }

  addAddress(address: Omit<Address, 'id'>): Observable<Address> {
    const currentUser = this.userSubject.value;
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    const newAddress: Address = {
      ...address,
      id: 'ADDR' + Date.now()
    };

    const updatedUser = {
      ...currentUser,
      addresses: [...currentUser.addresses, newAddress],
      updatedAt: new Date()
    };

    return of(newAddress).pipe(
      delay(500),
      map(addr => {
        this.userSubject.next(updatedUser);
        localStorage.setItem('berrybreez_user', JSON.stringify(updatedUser));
        return addr;
      })
    );
  }

  updateAddress(addressId: string, updates: Partial<Address>): Observable<Address> {
    const currentUser = this.userSubject.value;
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    const updatedAddresses = currentUser.addresses.map(addr =>
      addr.id === addressId ? { ...addr, ...updates } : addr
    );

    const updatedUser = {
      ...currentUser,
      addresses: updatedAddresses,
      updatedAt: new Date()
    };

    const updatedAddress = updatedAddresses.find(a => a.id === addressId)!;

    return of(updatedAddress).pipe(
      delay(500),
      map(addr => {
        this.userSubject.next(updatedUser);
        localStorage.setItem('berrybreez_user', JSON.stringify(updatedUser));
        return addr;
      })
    );
  }

  deleteAddress(addressId: string): Observable<boolean> {
    const currentUser = this.userSubject.value;
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    const updatedAddresses = currentUser.addresses.filter(addr => addr.id !== addressId);
    const updatedUser = {
      ...currentUser,
      addresses: updatedAddresses,
      updatedAt: new Date()
    };

    return of(true).pipe(
      delay(500),
      map(() => {
        this.userSubject.next(updatedUser);
        localStorage.setItem('berrybreez_user', JSON.stringify(updatedUser));
        return true;
      })
    );
  }

  setDefaultAddress(addressId: string): Observable<boolean> {
    const currentUser = this.userSubject.value;
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    const updatedAddresses = currentUser.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));

    const updatedUser = {
      ...currentUser,
      addresses: updatedAddresses,
      defaultAddressId: addressId,
      updatedAt: new Date()
    };

    return of(true).pipe(
      delay(500),
      map(() => {
        this.userSubject.next(updatedUser);
        localStorage.setItem('berrybreez_user', JSON.stringify(updatedUser));
        return true;
      })
    );
  }

  getAddresses(): Address[] {
    return this.userSubject.value?.addresses || [];
  }

  getDefaultAddress(): Address | undefined {
    const user = this.userSubject.value;
    if (!user) return undefined;
    return user.addresses.find(addr => addr.isDefault);
  }
}
