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
    GROUPLIST_SCREEN = 'MyGroupList',
    CREATEGROUP_SCREEN = 'CreateNewGroup',
    CREATEPOST_SCREEN = 'CreateNewPost',
    PROFILE_SCREEN = 'Profile',
    SEARCHRESULT_SCREEN = 'SearchResult',
    NOTIFICATION_SCREEN = 'Notification',
    SUPPORT_SCREEN = 'Support',
    MYPOST_SCREEN = 'MyPost',
    POSTDETAIL_SCREEN = 'PostDetail',
}

// eslint-disable-next-line no-shadow
export enum AppNavigators {
    ONBOARDING = 'OnboardingNavigator',
    TABBED_APP = 'TabbedApp',
    HOME_NAVIGATOR = 'HomeNavigator',
    SIGNIN = 'SigninNavigator',
    SIGNUP = 'SignupNavigator',
    SCHEDULE = 'ScheduleNavigator',
    GROUP = 'GroupNavigator',
    PROFILE = 'ProfileNavigator',
}

export type AppScreensParamList = {
    [AppScreens.ONBOARDING_SCREEN]: undefined;
    [AppScreens.HOME_SCREEN]: { savedActiveTab?: string; savedFilter?: string } | undefined;
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
    [AppScreens.GROUPLIST_SCREEN]: undefined;
    [AppScreens.CREATEGROUP_SCREEN]: undefined;
    [AppScreens.CREATEPOST_SCREEN]: undefined;
    [AppScreens.PROFILE_SCREEN]: undefined;
    [AppScreens.SEARCHRESULT_SCREEN]: { searchTerm: string };
    [AppScreens.NOTIFICATION_SCREEN]: undefined;
    [AppScreens.SUPPORT_SCREEN]: undefined;
    [AppScreens.MYPOST_SCREEN]: undefined;
    [AppScreens.POSTDETAIL_SCREEN]: {
        topicID: string;
        postID: string;
        savedActiveTab: string;
        savedFilter: string;
    };
} & { [key in AppNavigators]: undefined };

export type AppScreenProps<T extends AppScreens | AppNavigators> = {
    navigation: StackNavigationProp<AppScreensParamList, T>;
    route: RouteProp<AppScreensParamList, T>;
};
