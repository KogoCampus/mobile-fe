import { useEffect } from 'react';
import SbView from '../../.storybook';
import { useThemeFonts } from '../../theme';

import '../../theme/tailwind.css';

function AppEntry(): JSX.Element | null {
    const [, fontError] = useThemeFonts();

    useEffect(() => {
        async function initialize() {
            console.log('App Initialized.');
        }
        initialize();
    }, []);

    if (fontError) {
        console.error(`Failed to load fonts. ${fontError.message}`);
    }

    return SbView();
}

export default AppEntry;
