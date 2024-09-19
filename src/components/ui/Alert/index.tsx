import { AntDesign } from '@expo/vector-icons';
import { cva, VariantProps } from 'class-variance-authority';
import { View, Text } from 'react-native';
import { cn } from '../../../lib/utils';

const alertStyles = cva('px-4 py-2 rounded-3xl shadow-md flex-row items-center', {
    variants: {
        type: {
            success: 'bg-green-600',
            error: 'bg-red-600',
            info: 'bg-blue-600',
            warning: 'bg-yellow-600',
        },
    },
    defaultVariants: {
        type: 'info',
    },
});

type AlertProps = VariantProps<typeof alertStyles> & {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning' | null;
};

const getIcon = function (type: string) {
    switch (type) {
        case 'success':
            return <AntDesign name="check" size={24} color="white" />;
        case 'error':
            return <AntDesign name="close" size={24} color="white" />;
        case 'info':
            return <AntDesign name="infocirlceo" size={24} color="white" />;
        case 'warning':
            return <AntDesign name="warning" size={24} color="white" />;
        default:
            return <AntDesign name="infocirlceo" size={24} color="white" />;
    }
};

const Alert: React.FC<AlertProps> = function ({ message, type = 'info' }) {
    const alertType = type || 'info';

    return (
        <View className={cn(alertStyles({ type: alertType }))}>
            {getIcon(alertType)}
            <Text className="ml-2 text-white">{message}</Text>
        </View>
    );
};

export default Alert;
