import { useEffect } from 'react';
import { QueryClient, QueryClientConfig, QueryClientProvider, onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import AppNavigation from '@navigation/index';

import { useThemeFonts } from '../../theme';
import '../../theme/tailwind.css';

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

function AppEntry(): JSX.Element {
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

    return (
        <QueryClientProvider client={queryClient}>
            <AppNavigation />
        </QueryClientProvider>
    );
}

export default AppEntry;
