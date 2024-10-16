import { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
//  stories: ['../src/**/*.stories.?(js|jsx|mjs|ts|tsx)'],
  stories: ['../src/components/ui/Typography/index.stories.tsx'], // 이렇게 하나씩 고치자
  addons: [
    '@storybook/addon-ondevice-controls', 
    '@storybook/addon-ondevice-actions',
  ],
};

export default main;
