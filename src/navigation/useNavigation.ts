import { useNavigation as useNavigationImpl } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigators, AppScreens, AppScreensParamList } from './paramTypes';

export default function useNavigation<T extends AppScreens & AppNavigators>(): ReturnType<
    typeof useNavigationImpl<StackNavigationProp<AppScreensParamList, T>>
> {
    return useNavigationImpl<StackNavigationProp<AppScreensParamList, T>>();
}
