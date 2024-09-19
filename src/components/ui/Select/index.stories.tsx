import { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import Select from '@components/ui/Select';

const meta: Meta<typeof Select> = {
    title: 'Select',
    component: Select,
} satisfies Meta;

export default meta;

type Story = StoryObj<ComponentProps<typeof Select> & { placeholder: string; className: string; options: string[] }>;

export const Default: Story = {
    args: {
        intent: 'md',
        placeholder: 'Select an option',
        className: '',
        options: ['Option 1', 'Option 2', 'Option 3'],
    },
    argTypes: {
        intent: {
            options: ['sm', 'md', 'lg'],
            control: { type: 'radio' },
        },
    },
    render: ({ className, options }) => (
        <View className="p-8 space-y-8">
            <View className="mb-8">
                <Select intent="sm" placeholder="small" className={className} options={options} />
            </View>
            <View className="mt-8">
                <Select intent="lg" placeholder="large" className={className} options={options} />
            </View>
        </View>
    ),
};
