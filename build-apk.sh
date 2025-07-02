#!/bin/bash

echo "🚀 Building Zerodha Trading APK..."
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the ZerodhaTrading project root directory"
    exit 1
fi

# Check if Android SDK is configured
if [ -z "$ANDROID_HOME" ]; then
    echo "⚠️  Warning: ANDROID_HOME environment variable not set"
    echo "Please set ANDROID_HOME to your Android SDK location"
    echo ""
    echo "Example:"
    echo "export ANDROID_HOME=/path/to/android/sdk"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create assets directory if it doesn't exist
mkdir -p android/app/src/main/assets

# Generate bundle
echo "📦 Generating JavaScript bundle..."
npx react-native bundle \
    --platform android \
    --dev false \
    --entry-file index.js \
    --bundle-output android/app/src/main/assets/index.android.bundle \
    --assets-dest android/app/src/main/res

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate bundle"
    exit 1
fi

echo "✅ Bundle generated successfully"

# Build APK
echo "🔨 Building APK..."
cd android

# Make gradlew executable
chmod +x gradlew

# Clean build
echo "🧹 Cleaning previous build..."
./gradlew clean

# Build release APK
echo "🚀 Building release APK..."
./gradlew assembleRelease

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! APK built successfully!"
    echo "======================================"
    
    APK_PATH="app/build/outputs/apk/release/app-release.apk"
    
    if [ -f "$APK_PATH" ]; then
        APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
        echo "📱 APK Location: android/$APK_PATH"
        echo "📏 APK Size: $APK_SIZE"
        echo ""
        echo "🚀 Your Zerodha Trading app is ready!"
        echo "📲 Install on device: adb install $APK_PATH"
    else
        echo "⚠️  APK file not found at expected location"
    fi
else
    echo ""
    echo "❌ Build failed!"
    echo "==================="
    echo ""
    echo "🔧 Troubleshooting steps:"
    echo "1. Ensure ANDROID_HOME is set correctly"
    echo "2. Ensure Android SDK is installed (API 33+)"
    echo "3. Ensure Java JDK 17+ is installed"
    echo "4. Try: ./gradlew assembleDebug (for debug build)"
    echo ""
    echo "📖 See BUILD_APK_GUIDE.md for detailed instructions"
    exit 1
fi

cd ..

echo ""
echo "📋 What's in your APK:"
echo "  ✅ Professional trading interface"
echo "  ✅ Market data display (NIFTY, SENSEX)"
echo "  ✅ Portfolio management"
echo "  ✅ Quick buy/sell functionality"
echo "  ✅ Interactive trading features"
echo "  ✅ Modern UI design"
echo ""
echo "🔄 Next steps:"
echo "  1. Install APK on Android device"
echo "  2. Test all features"
echo "  3. Integrate real Zerodha API"
echo "  4. Deploy to Google Play Store"
echo ""
echo "Happy Trading! 📈"