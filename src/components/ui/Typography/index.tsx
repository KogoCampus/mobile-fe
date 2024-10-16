import { Text, TextStyle, TextProps } from 'react-native';

// const typography = cva('font-WantedSansMedium', {
//     variants: {
//         intent: {
//             icon: 'text-xs',
//             subtext: 'text-sm',
//             text: 'text-base',
//             header: 'text-xl',
//             subtitle: 'font-WantedSansSemiBold text-2xl',
//             title: 'font-WantedSansBold text-4xl',
//         },
//     },
//     defaultVariants: {
//         intent: 'text',
//     },
// });

const variantStyles: Record<TypographyVariants, TextStyle> = {
    icon: {
        fontSize: 8,
        fontFamily: 'WantedSans-Black',
    },
    subtext: {
        fontSize: 9,
    },
    text: {
        fontSize: 13,
    },
    header: {
        fontSize: 14,
    },
    subtitle: {
        fontSize: 20,
    },
    title: {
        fontSize: 32,
    },
};

export type TypographyVariants = 'title' | 'subtitle' | 'header' | 'text' | 'subtext' | 'icon';

export type TypographyProps = {
    children?: React.ReactNode;
    variant: TypographyVariants;
} & TextProps;

const Typography: React.FC<TypographyProps> = function ({ children, variant, ...props }) {
    return (
        <Text {...props} style={[props.style, variantStyles[variant]]}>
            {children}
        </Text>
    );
};

export default Typography;
