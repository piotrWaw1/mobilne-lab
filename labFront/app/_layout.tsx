import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import "../global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  axios.defaults.baseURL = "http://192.168.0.100:5000/";

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().then();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)/index" options={{ headerShown: false }}/>
          <Stack.Screen name="(tabs)/profile" options={{ headerShown: false }}/>
          <Stack.Screen name="+not-found"/>
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
