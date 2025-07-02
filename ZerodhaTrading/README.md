# Zerodha Trading App - React Native

A comprehensive trading application built with React Native, designed to integrate with Zerodha's API for stock trading, portfolio management, and market analysis.

## 📱 Features

### Core Features
- **Dashboard**: Market overview with indices, top gainers/losers
- **Portfolio Management**: View holdings, P&L, and portfolio analytics
- **Watchlist**: Add/remove stocks, search functionality
- **Order Management**: Place buy/sell orders, view order history
- **Stock Details**: Detailed stock information with charts
- **User Profile**: Account management and settings

### Technical Features
- Redux state management
- Mock API integration (with real Zerodha API structure)
- Modern UI with React Native Paper
- Navigation with React Navigation
- TypeScript support
- Chart visualization ready

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 18)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd ZerodhaTrading
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   ```

5. **Run the app**
   ```bash
   # For Android
   npm run android
   
   # For iOS (macOS only)
   npm run ios
   ```

## 📖 Demo Usage

### Login Credentials
Use these demo credentials to test the app:
- **User ID**: `demo`
- **Password**: `demo123`
- **2FA**: Leave empty or enter any 6 digits

### App Navigation
1. **Dashboard**: Market overview and quick trading actions
2. **Portfolio**: View your holdings and P&L
3. **Watchlist**: Search and track favorite stocks
4. **Orders**: Place new orders and view order history
5. **Profile**: Account settings and app information

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
├── screens/            # Main application screens
│   ├── DashboardScreen.tsx
│   ├── PortfolioScreen.tsx
│   ├── WatchlistScreen.tsx
│   ├── OrdersScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── LoginScreen.tsx
│   ├── StockDetailScreen.tsx
│   └── PlaceOrderScreen.tsx
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── services/          # API services
│   └── api.ts
├── store/            # Redux store configuration
│   └── index.ts
├── types/           # TypeScript type definitions
│   └── index.ts
└── utils/          # Utility functions
```

### State Management
The app uses Redux Toolkit for state management with the following structure:
- **User State**: Authentication and user information
- **Portfolio State**: Holdings and P&L data
- **Orders State**: Trading orders and history
- **Watchlist State**: Tracked stocks
- **Market Data State**: Live market information

## 🔌 API Integration

### Mock API
Currently uses mock data for demonstration. The API service (`src/services/api.ts`) includes:
- User authentication
- Market data fetching
- Portfolio management
- Order placement
- Stock search and quotes

### Real Zerodha Integration
To integrate with real Zerodha KiteConnect API:

1. Register for KiteConnect API
2. Update `src/services/api.ts` with real endpoints
3. Implement proper authentication flow
4. Add WebSocket for real-time data

Example integration:
```typescript
// Replace mock functions with real API calls
const API_BASE_URL = 'https://api.kite.trade';
const API_KEY = 'your_api_key';

// Implement OAuth2 flow for authentication
// Add WebSocket connection for live data
```

## 🎨 UI/UX Features

### Design System
- **Colors**: Blue-based theme matching trading apps
- **Typography**: Clear, readable fonts for financial data
- **Icons**: Material Design icons for consistency
- **Cards**: Shadow-based cards for information grouping

### Responsive Design
- Optimized for both phones and tablets
- Proper spacing and touch targets
- Accessibility support

## 🔧 Development

### Available Scripts
- `npm start`: Start Metro bundler
- `npm run android`: Run Android app
- `npm run ios`: Run iOS app
- `npm run lint`: Run ESLint
- `npm test`: Run tests

### Development Notes
- TypeScript is configured for type safety
- ESLint is set up with React Native rules
- Metro bundler configuration is optimized

## 📱 Screenshots

*Login Screen*: Clean authentication interface with demo credentials

*Dashboard*: Market overview with quick trading actions

*Portfolio*: Detailed holdings with P&L calculations

*Orders*: Order placement and history management

*Watchlist*: Stock search and tracking functionality

## 🔐 Security Considerations

### For Production Use
1. Implement proper authentication tokens
2. Add biometric authentication
3. Encrypt sensitive data
4. Use secure storage for credentials
5. Implement session management
6. Add rate limiting for API calls

## 🚀 Future Enhancements

### Planned Features
- Real-time WebSocket integration
- Advanced charting with TradingView
- Options trading support
- Mutual funds integration
- News and research integration
- Push notifications
- Dark mode theme
- Multiple language support

### Technical Improvements
- Add comprehensive tests
- Implement offline data caching
- Add performance monitoring
- Implement CI/CD pipeline
- Add error tracking (Sentry)

## 📄 License

This project is for educational and demonstration purposes. 

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review the API integration guide

## ⚠️ Disclaimer

This is a demo application for educational purposes. For production trading:
- Use proper risk management
- Implement real-time data feeds
- Add comprehensive error handling
- Follow financial regulations
- Use secure authentication methods

---

**Happy Trading! 📈**
