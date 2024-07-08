import { RouteProp, useRoute as useRouteImpl } from '@react-navigation/native';
import { AppNavigators, AppScreens, AppScreensParamList } from './paramTypes';

export default function useRoute<T extends AppScreens & AppNavigators>(): ReturnType<
    typeof useRouteImpl<RouteProp<AppScreensParamList, T>>
> {
    return useRouteImpl<RouteProp<AppScreensParamList, T>>();
}
