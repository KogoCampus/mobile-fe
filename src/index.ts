import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';

let AppEntryPoint;

console.log(Constants.expoConfig?.extra);

// Render Storybook if storybookEnabled is true
if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
    /* eslint-disable-next-line @typescript-eslint/no-var-requires, global-require */
    AppEntryPoint = require('../.storybook').default;
} else {
    AppEntryPoint = null;
}

registerRootComponent(AppEntryPoint);
