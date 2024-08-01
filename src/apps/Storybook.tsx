import { AlertProvider } from '@components/ui/Alert/AlertContext';
import SbView from '../../.storybook';
import ThemeFontProvider from './providers/ThemeFontProvider';

function AppEntry(): JSX.Element | null {
    return (
        <ThemeFontProvider>
            <AlertProvider>
                <SbView />
            </AlertProvider>
        </ThemeFontProvider>
    );
}

export default AppEntry;
