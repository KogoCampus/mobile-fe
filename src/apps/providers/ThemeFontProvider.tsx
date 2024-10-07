import Log from '@lib/logger';
import { useThemeFonts } from '../../../theme';

export default function ThemeFontProvider({ children }: { children: React.ReactNode }): JSX.Element | null {
    const [fontLoaded, fontError] = useThemeFonts();

    if (!fontLoaded && !fontError) {
        return null;
    }

    if (fontError) {
        Log.error(`Failed to load fonts. ${fontError.message}`);
    }

    return children as JSX.Element;
}
