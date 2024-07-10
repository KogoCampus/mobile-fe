import React from 'react';
import { View, Image, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Swiper from '@components/ui/Swiper';
import TextButton from '@components/ui/TextButton';
import Typography from '@components/ui/Typography';

function SplashScreen(): JSX.Element {
    const navigateToSignup = () => {
        console.log('Navigating to signup');
    };

    const navigateToSignIn = () => {
        console.log('Navigating to login');
    };

    /* eslint-disable global-require */
    return (
        <Swiper direction="horizontal">
            <View style={styles.slide}>
                <Image style={styles.image} source={require('@images/1.png')} />
                <Typography intent="text" className="text-base text-center px-5">
                    Organize your courses, plans, more
                </Typography>
            </View>
            <View style={styles.slide}>
                <Image style={styles.image} source={require('@images/2.png')} />
                <Typography intent="text" className="text-base text-center px-5">
                    Connect with other students in {'\n'}20+ Canadian Universities
                </Typography>
            </View>
            <View style={styles.slide}>
                <Image style={styles.image} source={require('@images/3.png')} />
                <Typography intent="text" className="text-base text-center px-5">
                    Broaden your university life
                </Typography>
                <View style={styles.buttonContainer}>
                    <TextButton intent="default" size="md" onPress={navigateToSignup} className="mb-4">
                        Get Started
                    </TextButton>
                    <View style={styles.signInContainer}>
                        <Typography intent="text" className="text-sm text-center mr-2">
                            Already have an account?
                        </Typography>
                        <TouchableOpacity onPress={navigateToSignIn}>
                            <Text style={styles.signInButton}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Swiper>
    );
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.3,
        resizeMode: 'contain',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        alignItems: 'center',
    },
    signInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signInButton: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'black',
        textDecorationLine: 'underline',
    },
});

export default SplashScreen;
