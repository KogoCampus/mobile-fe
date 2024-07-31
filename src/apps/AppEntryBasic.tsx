import { useEffect } from 'react';
import { QueryClient, QueryClientConfig, QueryClientProvider, onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import AppNavigation from '@navigation';
import { AlertProvider } from '@components/ui/Alert/AlertContext';
import withThemeFonts from './withThemeFonts';
import { log } from '../lib/logger';
// import log from '../lib/logger';

onlineManager.setEventListener(setOnline =>
    NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
    }),
);

const queryConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            retry: Number(process.env.EXPO_PUBLIC_API_DEFAULT_RETRY),
            retryDelay: Number(process.env.EXPO_PUBLIC_API_DEFAULT_RETRY_DELAY),
        },
    },
};

const queryClient = new QueryClient(queryConfig);

function AppEntry(): JSX.Element | null {
    useEffect(() => {
        async function initialize() {
            log.info('App Initialized.');
        }
        initialize();
    }, []);

    const Component = (
        <QueryClientProvider client={queryClient}>
            <AlertProvider>
                <AppNavigation />
            </AlertProvider>
        </QueryClientProvider>
    );

    return withThemeFonts(() => Component)({});
}

export default AppEntry;
