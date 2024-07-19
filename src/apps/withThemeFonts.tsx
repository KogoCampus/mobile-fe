import { useThemeFonts } from '../../theme';

export default function withThemeFonts<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function (props: P): JSX.Element | null {
        const [fontLoaded, fontError] = useThemeFonts();

        if (!fontLoaded && !fontError) {
            return null;
        }

        if (fontError) {
            console.error(`Failed to load fonts. ${fontError.message}`);
        }

        return <WrappedComponent {...(props as P)} />;
    };
}
