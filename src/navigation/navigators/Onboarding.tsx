import { Text } from 'react-native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';

import useNavigation from '../useNavigation';
import { AppNavigators, AppScreens, AppScreensParamList } from '../paramTypes';

const Stack = createStackNavigator<AppScreensParamList>();

// TO BE DELETED -------------------------
//
function SampleSplashScreen(): JSX.Element {
    const navigation = useNavigation();

    const navigateToLogin = () => {
        const action = CommonActions.reset({
            index: 0,
            routes: [{ name: AppNavigators.TABBED_APP }],
        });
        navigation.dispatch(action);
    };

    const timeout = setTimeout(() => {
        navigateToLogin();
        clearTimeout(timeout);
    }, 3000);

    return <Text style={{ fontSize: 60 }}>test splash screen</Text>;
}
// ---------------------------------------

const options: StackNavigationOptions = {
    animationEnabled: true,
};

function Onboarding(): JSX.Element {
    return (
        <Stack.Navigator initialRouteName={AppScreens.SPLASH_SCREEN} screenOptions={() => options}>
            <Stack.Screen name={AppScreens.SPLASH_SCREEN} component={SampleSplashScreen} />
        </Stack.Navigator>
    );
}

export default Onboarding;
