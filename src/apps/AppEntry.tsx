import AppNavigation from '@navigation';
import { AlertProvider } from '@components/ui/Alert/AlertContext';
import ThemeFontProvider from './providers/ThemeFontProvider';
import ReactQueryProvider from './providers/ReactQueryProvider';

function AppEntry(): JSX.Element {
    return (
        <ThemeFontProvider>
            <ReactQueryProvider>
                <AlertProvider>
                    <AppNavigation />
                </AlertProvider>
            </ReactQueryProvider>
        </ThemeFontProvider>
    );
}

export default AppEntry;
