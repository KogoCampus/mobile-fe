import { QueryClient, QueryClientConfig, QueryClientProvider, onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

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

export default function ReactQueryProvider({ children }: { children: React.ReactNode }): JSX.Element {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
