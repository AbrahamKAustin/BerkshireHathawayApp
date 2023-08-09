import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const useFonts = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      'manrope-regular': require('../assets/fonts/Manrope/static/Manrope-Regular.ttf'),
      'manrope-bold': require('../assets/fonts/Manrope/static/Manrope-Bold.ttf'),
      'manrope-extra-bold': require('../assets/fonts/Manrope/static/Manrope-ExtraBold.ttf'),
      'manrope-light': require('../assets/fonts/Manrope/static/Manrope-Light.ttf'),
      'manrope-medium': require('../assets/fonts/Manrope/static/Manrope-Medium.ttf'),
      'manrope-semi-bold': require('../assets/fonts/Manrope/static/Manrope-SemiBold.ttf'),
      'manrope-extra-light': require('../assets/fonts/Manrope/static/Manrope-ExtraLight.ttf'),
    });
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return fontLoaded;
};

export default useFonts;
