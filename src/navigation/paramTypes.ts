import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// eslint-disable-next-line no-shadow
export enum AppScreens {
    ONBOARDING_SCREEN = 'Onboarding',
    HOME_SCREEN = 'HomeScreen',
    APP_LOADING = 'AppLoading',
}
// eslint-disable-next-line no-shadow
export enum AppNavigators {
    ONBOARDING = 'Onboarding',
    TABBED_APP = 'TabbedApp',
    HOME_NAVIGATOR = 'HomeNavigator',
}

export type AppScreensParamList = {
    [AppScreens.ONBOARDING_SCREEN]: undefined;
    [AppScreens.HOME_SCREEN]: undefined;
    [AppScreens.APP_LOADING]: undefined;
} & { [key in AppNavigators]: undefined };

export type AppScreenProps<T extends AppScreens & AppNavigators> = {
    navigation: StackNavigationProp<AppScreensParamList, T>;
    route: RouteProp<AppScreensParamList, T>;
};
