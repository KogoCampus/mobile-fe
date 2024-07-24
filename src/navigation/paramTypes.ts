import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// eslint-disable-next-line no-shadow
export enum AppScreens {
    ONBOARDING_SCREEN = 'Onboarding',
    HOME_SCREEN = 'HomeScreen',
    APP_LOADING = 'AppLoading',
    SIGNIN_SCREEN = 'Signin',
    EMAILINPUT_SCREEN = 'EmailInput',
    CONFIRMATION_SCREEN = 'Confirmation',
    SETUP_SCREEN = 'Setup',
    INFO_SCREEN = 'Info',
    SCHEDULE_SCREEN = 'ScheduleScreen',
    EDIT_SCHEDULE = 'EditSchedule',
    EDIT_COURSE = 'EditCourse',
    ADD_COURSE = 'AddCourse',
}

// eslint-disable-next-line no-shadow
export enum AppNavigators {
    ONBOARDING = 'OnboardingNavigator',
    TABBED_APP = 'TabbedApp',
    HOME_NAVIGATOR = 'HomeNavigator',
    SIGNIN = 'SigninNavigator',
    SIGNUP = 'SignupNavigator',
    SCHEDULE = 'ScheduleNavigator',
}

export type AppScreensParamList = {
    [AppScreens.ONBOARDING_SCREEN]: undefined;
    [AppScreens.HOME_SCREEN]: undefined;
    [AppScreens.APP_LOADING]: undefined;
    [AppScreens.SIGNIN_SCREEN]: undefined;
    [AppScreens.EMAILINPUT_SCREEN]: undefined;
    [AppScreens.CONFIRMATION_SCREEN]: undefined;
    [AppScreens.SETUP_SCREEN]: undefined;
    [AppScreens.INFO_SCREEN]: undefined;
    [AppScreens.SCHEDULE_SCREEN]: { selectedTheme?: string };
    [AppScreens.EDIT_SCHEDULE]: { currentTheme: string };
    [AppScreens.EDIT_COURSE]: { colorTheme: string[] };
    [AppScreens.ADD_COURSE]: { colorTheme: string[] };
} & { [key in AppNavigators]: undefined };

export type AppScreenProps<T extends AppScreens | AppNavigators> = {
    navigation: StackNavigationProp<AppScreensParamList, T>;
    route: RouteProp<AppScreensParamList, T>;
};
