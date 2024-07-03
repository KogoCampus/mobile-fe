import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';

let AppEntryPoint;

// Render Storybook if storybookEnabled is true
if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
    /* eslint-disable-next-line @typescript-eslint/no-var-requires, global-require */
    AppEntryPoint = require('../.storybook').default;
} else {
    AppEntryPoint = require('../.storybook').default;
}

registerRootComponent(AppEntryPoint);
