import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import Typography from '@components/ui/Typography';
import { AntDesign } from '@expo/vector-icons';

const select = cva('border-b-2 font-WantedSansMedium', {
    variants: {
        intent: {
            sm: 'text-sm border-b-2 border-black w-40',
            md: 'text-base border-b-2 border-black w-56',
            lg: 'text-base border-b-2 border-black w-92',
        },
    },
    defaultVariants: {
        intent: 'md',
    },
});

type SelectProps = VariantProps<typeof select> & {
    options: string[];
    className?: string;
    placeholder?: string;
};

const Select: React.FC<SelectProps> = ({ intent, className, options, placeholder }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionPress = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <View className="relative">
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)} className={cn(select({ intent, className }))}>
                <View className="flex-row justify-between items-center">
                    <Typography intent="text">{selectedOption || placeholder}</Typography>
                    <AntDesign name={isOpen ? 'up' : 'down'} size={16} color="black" />
                </View>
            </TouchableOpacity>
            {isOpen && (
                <View
                    className="absolute left-0 right-0 bg-white border border-gray-300 rounded shadow-md z-20"
                    style={{ top: '100%', maxHeight: 200, overflow: 'hidden' }}>
                    <ScrollView style={{ maxHeight: '100%' }} contentContainerStyle={{ backgroundColor: 'white' }}>
                        {options.map(option => (
                            <TouchableOpacity key={option} onPress={() => handleOptionPress(option)} className="p-2">
                                <Typography intent="text">{option}</Typography>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default Select;
