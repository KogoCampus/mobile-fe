import { View, Text, SafeAreaView } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem, ListItemText } from './index';

const meta: Meta<typeof List> = {
    title: 'List',
    component: List,
    argTypes: {
        intent: {
            options: ['horizontal', 'vertical'],
            control: { type: 'radio' },
        },
    },
    decorators: [
        (Story: () => JSX.Element): JSX.Element => (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Story />
            </SafeAreaView>
        ),
    ],
};

export default meta;

type Story = StoryObj<React.ComponentProps<typeof List>>;

export const BasicList: Story = {
    args: {
        intent: 'vertical',
    },
    render: ({ intent }) => (
        <View style={{ padding: 20 }}>
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>Vertical List</Text>
            <List intent={intent} style={{ height: 200 }}>
                <ListItem>
                    <ListItemText primary="Title 1" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Title 2" />
                </ListItem>
            </List>
            <Text style={{ textAlign: 'center', marginVertical: 20 }}>Horizontal List</Text>
            <List intent="horizontal">
                <ListItem>
                    <ListItemText primary="Title 1" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Title 2" />
                </ListItem>
            </List>
        </View>
    ),
};
