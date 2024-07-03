import { registerRootComponent } from 'expo';
import { useThemeFonts } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { view } from './storybook.requires';

import '../theme/tailwind.css';

function KmcUIEntry(): JSX.Element | null {
  const [, fontError] = useThemeFonts();

  if (fontError) {
    console.error(`Failed to load fonts. ${fontError.message}`);
  }

  return view.getStorybookUI({
    storage: {
      getItem: AsyncStorage.getItem,
      setItem: AsyncStorage.setItem,
    },
  })();
}

export default KmcUIEntry;
