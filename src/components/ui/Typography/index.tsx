import { cva, VariantProps } from 'class-variance-authority';
import { Text } from 'react-native';

import { cn } from '../../../lib/utils';

const typography = cva('font-WantedSansMedium', {
    variants: {
        intent: {
            icon: 'text-xs',
            subtext: 'text-sm',
            text: 'text-base',
            header: 'text-xl',
            subtitle: 'font-WantedSansSemiBold text-2xl',
            title: 'font-WantedSansBold text-4xl',
        },
    },
    defaultVariants: {
        intent: 'text',
    },
});

type TypographyProps = VariantProps<typeof typography> & {
    children?: React.ReactNode;
    className?: string;
};

const Typography: React.FC<TypographyProps> = function ({ intent, className, children }) {
    return <Text className={cn(typography({ intent, className }))}>{children}</Text>;
};

export default Typography;
