module.exports = {
  expo: {
    newArchEnabled: true,
    name: 'expo-router-starter-kit-(expo-go)',
    owner: 'Ayan',
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    slug: 'expo-router-starter-kit',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './public/favicon.png',
    scheme: 'acme',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './public/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#fff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
      // url: 'https://u.expo.dev/564f22dd-cb02-43e7-b4a9-d0f7c49ea2ef',
    },
    mode: 'production',
    assetBundlePatterns: ['**/*'],
    packagerOpts: {
      assetExts: ['ttf', 'otf'],
    },
    build: {
      development: {
        distribution: 'internal',
      },
      preview: {
        distribution: 'internal',
      },
      production: {
        distribution: 'store',
      },
    },
    ios: {
      // newArchEnabled: true,
      supportsTablet: true,
      bundleIdentifier: 'com.your.bundle.identifier',
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    android: {
      package: 'com.your.bundle.identifier',
      // newArchEnabled: true,
      adaptiveIcon: {
        foregroundImage: './public/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      // Add your custom intent filters here for Deep Linking
      softwareKeyboardLayoutMode: 'pan',
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'https',
              host: '*.myapp.io',
              pathPrefix: '/records',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    web: {
      bundler: 'metro',
      favicon: './public/favicon.png',
    },
    plugins: [['expo-router']],
    runtimeVersion: {
      policy: 'appVersion',
    },
    extra: {
      eas: {
        projectId: '564f22dd-cb02-43e7-b4a9-d0f7c49ea2ef',
      },
    },
  },
};
