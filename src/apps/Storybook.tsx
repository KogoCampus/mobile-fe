import { AlertProvider } from '@components/ui/Alert/AlertContext';
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

    return <AlertProvider>{withThemeFonts(SbView)({})}</AlertProvider>;
}

export default AppEntry;
