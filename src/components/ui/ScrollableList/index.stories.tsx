import React from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollableList, ListItem } from './index';

const meta: Meta<typeof ScrollableList> = {
    title: 'ScrollableList',
    component: ScrollableList,
    argTypes: {
        intent: {
            options: ['horizontal', 'vertical'],
            control: { type: 'radio' },
        },
    },
    decorators: [
        (Story: React.FC): JSX.Element => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Story />
            </View>
        ),
    ],
};

export default meta;

type Story = StoryObj<React.ComponentProps<typeof ScrollableList>>;

export const BasicList: Story = {
    args: {
        intent: 'vertical',
    },
    render: ({ intent }) => (
        <View style={{ padding: 20 }}>
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>Vertical Scrollable List</Text>
            <ScrollableList intent="vertical" style={{ height: 200 }}>
                <ListItem>
                    <Text>Title 1</Text>
                </ListItem>
                <ListItem>
                    <Text>Title 2</Text>
                </ListItem>
            </ScrollableList>
            <Text style={{ textAlign: 'center', marginVertical: 20 }}>Horizontal Scrollable List</Text>
            <ScrollableList intent="horizontal" style={{ height: 100 }}>
                <ListItem>
                    <Text>Title 1</Text>
                </ListItem>
                <ListItem>
                    <Text>Title 2</Text>
                </ListItem>
            </ScrollableList>
        </View>
    ),
};
