import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppScreens, AppScreensParamList } from '../navigation/paramTypes';

type AppLoadingNavigationProp = StackNavigationProp<AppScreensParamList, AppScreens.APP_LOADING>;

function AppLoading(): JSX.Element {
    const navigation = useNavigation<AppLoadingNavigationProp>();

    const dot1Anim = useRef(new Animated.Value(Dimensions.get('window').height / 2 - 21)).current;
    const dot2Anim = useRef(new Animated.Value(Dimensions.get('window').height / 2 + 19)).current;

    useEffect(() => {
        const bounceAnimation = (animationValue: Animated.Value, toValue1: number, toValue2: number) =>
            Animated.sequence([
                Animated.timing(animationValue, {
                    toValue: toValue1,
                    duration: 500,
                    easing: Easing.in(Easing.quad),
                    useNativeDriver: false,
                }),
                Animated.spring(animationValue, {
                    toValue: toValue2,
                    speed: 5,
                    bounciness: 20,
                    useNativeDriver: false,
                }),
            ]);

        const startBounce = () => {
            Animated.parallel([
                bounceAnimation(
                    dot1Anim,
                    Dimensions.get('window').height / 2 - 11,
                    Dimensions.get('window').height / 2 - 21,
                ),
                bounceAnimation(
                    dot2Anim,
                    Dimensions.get('window').height / 2 + 9,
                    Dimensions.get('window').height / 2 + 19,
                ),
            ]).start(() => {
                navigation.navigate({ name: AppScreens.ONBOARDING_SCREEN, params: undefined });
            });
        };

        const bounceTimeout = setTimeout(startBounce, 1000);

        return () => {
            clearTimeout(bounceTimeout);
        };
    }, [dot1Anim, dot2Anim, navigation]);

    return (
        /* eslint-disable global-require */
        <View style={styles.container}>
            <Image style={styles.logo} source={require('@images/logo_.png')} />
            <Animated.View style={[styles.dot, styles.dot1, { top: dot1Anim }]} />
            <Animated.View style={[styles.dot, styles.dot2, { top: dot2Anim }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 100,
        height: 110,
        resizeMode: 'stretch',
    },
    dot: {
        position: 'absolute',
        width: 9,
        height: 9,
        borderRadius: 10,
        backgroundColor: 'black',
    },
    dot1: {
        left: Dimensions.get('window').width / 2 - 18,
    },
    dot2: {
        left: Dimensions.get('window').width / 2 + 34,
    },
});

export default AppLoading;
