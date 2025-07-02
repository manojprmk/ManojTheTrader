# 🚀 Quick Start Guide

## 📱 Get the App Running in 3 Steps

### Step 1: Setup
```bash
# Make setup script executable and run it
chmod +x setup.sh
./setup.sh

# OR manually install
npm install
```

### Step 2: Start Metro
```bash
npm start
```

### Step 3: Run App
```bash
# Android
npm run android

# iOS (macOS only)
npm run ios
```

## 🔐 Login to the App

Use these demo credentials:
- **User ID**: `demo`
- **Password**: `demo123`
- **2FA**: Leave empty or enter any 6 digits

## 📱 App Features Overview

### 🏠 Dashboard
- Market indices overview
- Top gainers and losers
- Quick buy/sell buttons
- Real-time market data (mock)

### 💼 Portfolio
- Holdings with current prices
- Profit & Loss calculations
- Total portfolio value
- Individual stock performance

### 👁️ Watchlist
- Search and add stocks
- Remove stocks from watchlist
- Real-time price updates
- Quick access to stock details

### 📊 Orders
- Place buy/sell orders
- View order history
- Order status tracking
- Order summary and total calculations

### 👤 Profile
- User account information
- App settings and preferences
- Logout functionality
- About and support options

## 🎯 Key Interactions

1. **Search Stocks**: Use the watchlist screen to search for stocks
2. **View Details**: Tap any stock to see detailed information
3. **Place Orders**: Use the "Place Order" button or stock detail screen
4. **Track Portfolio**: Monitor your holdings in the portfolio screen
5. **Quick Trading**: Use dashboard quick buttons for instant trading

## 🛠️ Troubleshooting

### Metro Bundle Issues
```bash
# Clear cache and restart
npx react-native start --reset-cache
```

### Android Build Issues
```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npm run android
```

### iOS Build Issues (macOS)
```bash
# Reinstall pods
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

## 📚 Next Steps

1. **Explore Features**: Try all screens and functionalities
2. **Customize**: Modify colors, layouts, or add new features
3. **Real API**: Integrate with actual Zerodha KiteConnect API
4. **Enhance**: Add charts, notifications, or advanced features

## 💡 Development Tips

- **Hot Reload**: Shake device or press R twice for Android, Cmd+R for iOS
- **Developer Menu**: Cmd+D (iOS) or Cmd+M (Android)
- **Debug**: Use Flipper or React Native Debugger
- **State**: Check Redux DevTools for state management

## 🤝 Need Help?

- Check `README.md` for detailed documentation
- Review the source code in `src/` directory
- Look at component structure and API integration
- Modify mock data in `src/services/api.ts`

---
**Happy Trading! 📈**