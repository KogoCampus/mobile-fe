import { useEffect } from 'react';
import SbView from '../../.storybook';
import withThemeFonts from './withThemeFonts';

function AppEntry(): JSX.Element | null {
    useEffect(() => {
        async function initialize() {
            console.log('App Initialized.');
        }
        initialize();
    }, []);

    return withThemeFonts(SbView)({});
}

export default AppEntry;
