This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## 📱 Download APK

#### Download The App [Download MyApp v1.0](apk/app-release.apk)

# Developer guide:

## Project Setup

Note: In Project Directory Run:

```
yarn
```

Connect Your Device then check if device detected (Run):

`adb devices`

If Device Detected Then Run:

```
npx react-native run-android
```

Note: You Must have React native Environtment setup in you PC.

## Check Logs

npx react-native log-android

# Getting Started

## Make Release APK

#

```sh
cd android
gradlew assembleRelease


```

## Install APK ON Your Mobile

```sh

adb install android/app/build/outputs/apk/debug/app-debug.apk

// Resintall if already installed

adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
