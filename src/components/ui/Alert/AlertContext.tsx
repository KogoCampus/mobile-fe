import React, { createContext, useContext, useState, ReactNode, useRef, useMemo, useCallback } from 'react';
import { Modal, Text, Animated, SafeAreaView } from 'react-native';
import {
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PanGestureHandlerStateChangeEvent,
    State,
} from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
    message: string;
    type: AlertType;
}

interface AlertContextProps {
    showAlert: (message: string, options: Partial<AlertProps>) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = function (): AlertContextProps {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('');
    }
    return context;
};

const getIcon = function (type: AlertType) {
    switch (type) {
        case 'success':
            return <AntDesign name="check" size={24} color="white" />;
        case 'error':
            return <AntDesign name="close" size={24} color="white" />;
        case 'info':
            return <AntDesign name="infocirlceo" size={24} color="white" />;
        case 'warning':
            return <AntDesign name="warning" size={24} color="white" />;
        default:
            return <AntDesign name="infocirlceo" size={24} color="white" />;
    }
};

const alertStyles = cva('px-4 py-2 rounded-3xl shadow-md flex-row items-center', {
    variants: {
        type: {
            success: 'bg-green-600',
            error: 'bg-red-600',
            info: 'bg-blue-600',
            warning: 'bg-yellow-600',
        },
    },
    defaultVariants: {
        type: 'info',
    },
});

type AlertContainerProps = {
    children: ReactNode;
};

export const AlertProvider: React.FC<AlertContainerProps> = function ({ children }) {
    const [alert, setAlert] = useState<AlertProps | null>(null);
    const slideAnim = useRef(new Animated.Value(-50)).current;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const hideAlert = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        Animated.timing(slideAnim, {
            toValue: -100,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setAlert(null));
    }, [slideAnim]);

    const showAlert = useCallback(
        (message: string, options: Partial<AlertProps>) => {
            setAlert({ message, type: 'info', ...options });
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();

            timeoutRef.current = setTimeout(() => {
                hideAlert();
            }, 10000);
        },
        [hideAlert, slideAnim],
    );

    const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
        const { translationY } = event.nativeEvent;
        if (translationY < 0) {
            slideAnim.setValue(translationY + 20);
        }
    };

    const handleStateChange = (event: PanGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.END) {
            const { translationY } = event.nativeEvent;
            if (translationY < -40) {
                hideAlert();
            } else {
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    const alertContextValue = useMemo(() => ({ showAlert }), [showAlert]);

    return (
        <AlertContext.Provider value={alertContextValue}>
            {children}
            {alert && (
                <Modal visible={!!alert} transparent animationType="none">
                    <SafeAreaView className="flex-1 justify-start items-center mt-20">
                        <GestureHandlerRootView>
                            <PanGestureHandler
                                onGestureEvent={handleGestureEvent}
                                onHandlerStateChange={handleStateChange}>
                                <Animated.View
                                    style={{ transform: [{ translateY: slideAnim }] }}
                                    className={cn(alertStyles({ type: alert.type }))}>
                                    {getIcon(alert.type)}
                                    <Text className="ml-2 text-white">{alert.message}</Text>
                                </Animated.View>
                            </PanGestureHandler>
                        </GestureHandlerRootView>
                    </SafeAreaView>
                </Modal>
            )}
        </AlertContext.Provider>
    );
};
