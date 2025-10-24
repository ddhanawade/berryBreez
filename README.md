# BerryBreez - Fresh Products E-commerce Platform

A comprehensive Angular 19 e-commerce application for selling fresh products from Mahabaleshwar, including seasonal fruits, vegetables, groceries, and nursery plants.

## 🌟 Features

### Customer Features
- **Product Browsing**: Browse products by categories (Fruits, Vegetables, Groceries, Plants)
- **Search & Filter**: Advanced search and filtering capabilities
- **Shopping Cart**: Add products to cart with quantity management
- **Checkout Process**: Complete order placement with address selection
- **Order Management**: View current and past orders with tracking
- **User Profile**: Manage personal information and multiple delivery addresses
- **Authentication**: Secure login and registration system

### Seller Features
- **Seller Portal**: Dedicated portal for farmers and sellers to list products
- **Product Management**: Add, edit, and manage product listings
- **Direct to Consumer**: Connect farmers directly with customers

### Product Categories
- **Seasonal Berries**: Strawberries, Mulberries, Golden Berries, Raspberries
- **Seasonal Fruits**: Alphonso Mangoes and more
- **Fresh Vegetables**: Tomatoes, Carrots, and other farm-fresh produce
- **Branded Products**: Mapro, Malas, Madhusagar, Dhananjay brands
- **Nursery Plants**: Fruit plants, flowering plants, and more
- **Organic Groceries**: Rice, pulses, honey, and natural products

## 🚀 Technology Stack

- **Framework**: Angular 19 (Standalone Components)
- **Language**: TypeScript
- **Styling**: SCSS with modern CSS features
- **State Management**: RxJS with BehaviorSubjects
- **Routing**: Angular Router with lazy loading
- **Build Tool**: Angular CLI with esbuild

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with advanced layouts
- **Tablet**: Optimized touch-friendly interface
- **Mobile**: Android app-like experience with mobile-first design
- **Breakpoints**: 320px, 480px, 768px, 1024px, 1200px, 1400px+

## 🎨 Design Features

- **Modern UI**: Clean, professional design with green accent colors
- **Professional Typography**: Optimized for readability across devices
- **Smooth Animations**: Subtle transitions and micro-interactions
- **Accessible**: WCAG compliant with proper contrast ratios
- **Touch-Optimized**: Minimum 44px touch targets for mobile
- **Performance**: Optimized bundle sizes with lazy loading

## 📦 Project Structure

```
berrybreez/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/          # Navigation header
│   │   │   ├── footer/          # Footer component
│   │   │   └── product-card/    # Reusable product card
│   │   ├── pages/
│   │   │   ├── home/            # Homepage with hero & featured products
│   │   │   ├── products/        # Product listing page
│   │   │   ├── product-detail/  # Individual product details
│   │   │   ├── cart/            # Shopping cart
│   │   │   ├── checkout/        # Checkout process
│   │   │   ├── orders/          # Order history & tracking
│   │   │   ├── profile/         # User profile management
│   │   │   ├── auth/            # Login & registration
│   │   │   └── seller-portal/   # Seller dashboard
│   │   ├── services/
│   │   │   ├── auth.service.ts      # Authentication logic
│   │   │   ├── cart.service.ts      # Cart management
│   │   │   ├── product.service.ts   # Product operations
│   │   │   ├── order.service.ts     # Order management
│   │   │   └── user.service.ts      # User profile operations
│   │   ├── models/
│   │   │   ├── product.model.ts     # Product interfaces
│   │   │   ├── cart.model.ts        # Cart interfaces
│   │   │   ├── order.model.ts       # Order interfaces
│   │   │   └── user.model.ts        # User interfaces
│   │   ├── app.component.*
│   │   ├── app.routes.ts        # Route configuration
│   │   └── app.config.ts
│   ├── styles.scss              # Global styles
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI 19

### Installation Steps

1. **Clone the repository**
   ```bash
   cd berrybreez
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200`

4. **Build for production**
   ```bash
   ng build --configuration production
   ```

## 🎯 Available Scripts

- `ng serve` - Start development server
- `ng build` - Build the project
- `ng test` - Run unit tests
- `ng lint` - Lint the code
- `ng serve --port 4300` - Start on custom port

## 📊 Sample Data

The application includes comprehensive mock data:
- **15+ Products**: Across all categories with detailed information
- **Product Images**: High-quality product images from Unsplash
- **Ratings & Reviews**: Mock ratings and review counts
- **Pricing**: Realistic pricing with discounts
- **Stock Management**: Inventory tracking

## 🔐 Authentication

The application uses a mock authentication system:
- **Demo Login**: Use any email/password combination
- **Quick Demo**: Click "Demo Login" for instant access
- **Local Storage**: User data persists in browser storage
- **Role-based**: Supports customer, seller, and admin roles

## 🛒 Cart & Checkout

- **Persistent Cart**: Cart data saved in localStorage
- **Quantity Management**: Increase/decrease product quantities
- **Price Calculation**: Automatic subtotal, discount, and delivery charge calculation
- **Free Delivery**: Orders above ₹500 get free delivery
- **Multiple Addresses**: Support for multiple delivery addresses

## 📱 Mobile Experience

The mobile view is designed to mimic native Android e-commerce apps:
- **Bottom Navigation**: Easy thumb-reach navigation
- **Swipeable Cards**: Touch-optimized product cards
- **Hamburger Menu**: Collapsible navigation menu
- **Mobile Search**: Full-screen search experience
- **Touch Gestures**: Optimized for touch interactions

## 🎨 Design System

### Color Palette
- **Primary Green**: #22c55e (Fresh & Natural)
- **Primary Green Dark**: #16a34a
- **Primary Green Light**: #86efac
- **Secondary Blue**: #3b82f6
- **Secondary Purple**: #8b5cf6
- **Neutral Grays**: #f9fafb to #111827

### Typography
- **Font Family**: System fonts for optimal performance
- **Headings**: 600-800 font weight
- **Body**: 400 font weight
- **Line Height**: 1.5-1.7 for readability

### Components
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Cards**: Modern card-based layouts
- **Forms**: Professional form controls with validation
- **Badges**: Status and category badges

## 🚀 Future Enhancements

### Planned Features
1. **Backend Integration**: Connect to REST API
2. **Payment Gateway**: Integrate Razorpay/Stripe
3. **Real-time Updates**: WebSocket for order tracking
4. **Push Notifications**: Order status notifications
5. **Advanced Search**: Elasticsearch integration
6. **Product Reviews**: User-generated reviews and ratings
7. **Wishlist**: Save products for later
8. **Social Sharing**: Share products on social media
9. **Multi-language**: Support for regional languages
10. **PWA**: Progressive Web App capabilities

### Technical Improvements
- **State Management**: NgRx for complex state
- **Testing**: Comprehensive unit and E2E tests
- **Performance**: Further optimization and caching
- **SEO**: Server-side rendering with Angular Universal
- **Analytics**: Google Analytics integration
- **Error Tracking**: Sentry integration

## 📄 License

This project is created for educational and demonstration purposes.

## 👥 Contributing

This is a demonstration project. For production use, please:
1. Implement proper backend API
2. Add authentication security
3. Integrate payment gateway
4. Add comprehensive testing
5. Implement error handling
6. Add logging and monitoring

## 📞 Contact

For questions or support regarding this project, please refer to the documentation or create an issue.

## 🙏 Acknowledgments

- **Angular Team**: For the amazing framework
- **Unsplash**: For high-quality product images
- **Mahabaleshwar Farmers**: Inspiration for the project concept

---

**Built with ❤️ using Angular 19**
