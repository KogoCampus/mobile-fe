import { View } from 'react-native';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Story />
      </View>
    )
  ]
};

export default preview;
