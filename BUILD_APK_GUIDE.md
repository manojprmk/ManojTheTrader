# 📱 APK Build Guide - Zerodha Trading App

## 🎯 Complete Guide to Build Your Trading App APK

### 📋 Prerequisites

1. **Node.js** (>= 18)
2. **Java Development Kit (JDK)** 17 or 21
3. **Android Studio** with Android SDK
4. **React Native CLI**

### 🔧 Environment Setup

#### 1. Install Android Studio
- Download from https://developer.android.com/studio
- Install Android SDK (API 33 or 34)
- Add Android SDK to PATH

#### 2. Set Environment Variables

**Windows (PowerShell):**
```powershell
$env:ANDROID_HOME="C:\Users\YourUsername\AppData\Local\Android\Sdk"
$env:PATH="$env:PATH;$env:ANDROID_HOME\platform-tools"
```

**macOS/Linux (Bash/Zsh):**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

#### 3. Verify Setup
```bash
# Check Android SDK
adb version

# Check Java
java -version

# Check Node.js
node -v
```

### 🚀 Build Process

#### Step 1: Download Project
```bash
# If you have the project files locally
cd ZerodhaTrading

# Install dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..
```

#### Step 2: Generate Signing Key (First time only)
```bash
# Navigate to android/app
cd android/app

# Generate keystore
keytool -genkeypair -v -keystore zerodha-trading-key.keystore -alias zerodha-trading -keyalg RSA -keysize 2048 -validity 10000

# Follow prompts to set password and details
```

#### Step 3: Configure Gradle for Release

Create `android/gradle.properties` file:
```properties
MYAPP_UPLOAD_STORE_FILE=zerodha-trading-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=zerodha-trading
MYAPP_UPLOAD_STORE_PASSWORD=yourPassword
MYAPP_UPLOAD_KEY_PASSWORD=yourPassword

# Enable newer Android features
android.useAndroidX=true
android.enableJetifier=true

# Increase memory
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

#### Step 4: Configure Build Settings

Edit `android/app/build.gradle`:
```gradle
android {
    compileSdkVersion 34
    buildToolsVersion "34.0.0"

    defaultConfig {
        applicationId "com.zerodhatrading"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0"
    }

    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            signingConfig signingConfigs.release
        }
    }
}
```

#### Step 5: Build APK
```bash
# Clean build
cd android
./gradlew clean

# Build release APK
./gradlew assembleRelease

# The APK will be generated at:
# android/app/build/outputs/apk/release/app-release.apk
```

### 📱 Alternative: Debug APK (Faster)
```bash
# For testing (unsigned APK)
cd android
./gradlew assembleDebug

# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

### 🎯 Direct Bundle Build
```bash
# Generate JavaScript bundle
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Then build APK
cd android && ./gradlew assembleRelease
```

## 📋 App Configuration

### Update App Details

**android/app/src/main/res/values/strings.xml:**
```xml
<resources>
    <string name="app_name">Zerodha Trading</string>
</resources>
```

**android/app/src/main/AndroidManifest.xml:**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="com.zerodhatrading">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
      android:name=".MainApplication"
      android:label="@string/app_name"
      android:icon="@mipmap/ic_launcher"
      android:roundIcon="@mipmap/ic_launcher_round"
      android:allowBackup="false"
      android:theme="@style/AppTheme">
      
      <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
        android:launchMode="singleTask"
        android:windowSoftInputMode="adjustResize"
        android:exported="true">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
      </activity>
    </application>
</manifest>
```

## 🎨 App Icon Setup

Create app icons for different densities:
- `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
- `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)
- `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
- `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
- `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)

Use online tools like https://romannurik.github.io/AndroidAssetStudio/ to generate icons.

## 🚀 Build Optimization

### Enable Proguard (app/proguard-rules.pro):
```proguard
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

-dontwarn com.facebook.react.**
-dontwarn com.facebook.hermes.**

# Keep your app's classes
-keep class com.zerodhatrading.** { *; }
```

### Reduce APK Size
Add to `android/app/build.gradle`:
```gradle
android {
    splits {
        abi {
            reset()
            enable true
            universalApk false
            include "arm64-v8a", "armeabi-v7a", "x86", "x86_64"
        }
    }
}
```

## 🧪 Testing APK

### Install on Device
```bash
# Enable USB debugging on Android device
adb install android/app/build/outputs/apk/release/app-release.apk

# Or drag and drop APK file to device
```

### Test Features
- ✅ App launches successfully
- ✅ Trading dashboard displays
- ✅ Quick buy/sell buttons work
- ✅ Portfolio data shows
- ✅ Feature buttons respond
- ✅ No crashes or errors

## 📦 Final APK Location

After successful build:
```
📁 ZerodhaTrading/
└── 📁 android/
    └── 📁 app/
        └── 📁 build/
            └── 📁 outputs/
                └── 📁 apk/
                    └── 📁 release/
                        └── 📱 app-release.apk  ← YOUR APK FILE
```

## 🚨 Troubleshooting

### Common Issues:

**1. SDK Not Found**
```bash
# Set ANDROID_HOME environment variable
export ANDROID_HOME=/path/to/android/sdk
```

**2. Gradle Build Failed**
```bash
# Clear Gradle cache
cd android
./gradlew clean
rm -rf ~/.gradle/caches
```

**3. Memory Issues**
```bash
# Increase memory in gradle.properties
org.gradle.jvmargs=-Xmx4096m
```

**4. Metro Bundle Issues**
```bash
# Reset Metro cache
npx react-native start --reset-cache
```

**5. Permission Denied**
```bash
# Make gradlew executable
chmod +x android/gradlew
```

## 🎯 Success Checklist

- ✅ Environment variables set (ANDROID_HOME)
- ✅ Android SDK installed (API 33+)
- ✅ Java JDK 17+ installed
- ✅ Dependencies installed (`npm install`)
- ✅ Keystore generated for signing
- ✅ Build configuration updated
- ✅ APK built successfully
- ✅ APK tested on device

## 📝 Build Script

Create `build-apk.sh` for automated building:
```bash
#!/bin/bash
echo "🚀 Building Zerodha Trading APK..."

# Install dependencies
npm install

# Clean build
cd android
./gradlew clean

# Build release APK
./gradlew assembleRelease

# Show result
echo "✅ APK built successfully!"
echo "📱 Location: android/app/build/outputs/apk/release/app-release.apk"
echo "📱 Size: $(du -h android/app/build/outputs/apk/release/app-release.apk)"
```

---

## 🎉 Congratulations!

You now have a complete APK build process for your Zerodha Trading app! The APK will be fully functional with:

- 📱 Professional trading interface
- 💼 Portfolio management
- 📊 Market data display
- 🔄 Quick trading actions
- 🎨 Modern UI design

**Ready for distribution and real Zerodha API integration!** 🚀📈