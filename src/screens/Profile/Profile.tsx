import React, { useState } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Zocial, FontAwesome6, Ionicons } from '@expo/vector-icons';
import Typography from '@components/ui/Typography';
import Switch from '@components/ui/Switch';

function Profile(): JSX.Element {
    const [isOn, setIsOn] = useState(false);
    const onPress = () => setIsOn(prev => !prev);

    /* eslint-disable global-require */
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                <View className="flex-row items-center justify-between w-full p-5">
                    <Typography intent="subtitle">Profile</Typography>
                </View>
                <View className="flex-1 p-5 bg-white">
                    <View className="mb-5">
                        <View className="flex-row items-center mb-2">
                            <Typography intent="subtitle" className="text-base font-bold text-left">
                                General
                            </Typography>
                            <View className="flex-1 h-px bg-gray-300 ml-2" />
                        </View>
                        <View className="flex-row justify-between items-center px-4 py-2">
                            <View className="flex-row items-center">
                                <Image
                                    source={require('../../assets/images/logo.png')}
                                    className="border border-gray-300 rounded-full w-12 h-12 mr-3"
                                />

                                <View>
                                    <Typography intent="subtitle" className="text-left">
                                        Username
                                    </Typography>
                                    <Typography intent="text" className="text-left text-gray-600">
                                        SFU
                                    </Typography>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <FontAwesome6 name="pencil" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className="flex-row items-center justify-between px-4 py-2" onPress={onPress}>
                            <View className="flex-row items-center">
                                <Ionicons name="notifications" size={18} color="black" />
                                <Typography intent="text" className="pl-2">
                                    Notifications
                                </Typography>
                            </View>
                            <Switch value={isOn} onSwitch={onPress} />
                        </TouchableOpacity>
                    </View>

                    <View className="mb-5">
                        <View className="flex-row items-center mb-2">
                            <Typography intent="subtitle" className="text-base font-bold text-left">
                                Account
                            </Typography>
                            <View className="flex-1 h-px bg-gray-300 ml-2" />
                        </View>
                        <TouchableOpacity className="flex-row items-center px-4 py-2">
                            <Zocial name="email" size={18} color="black" />
                            <Typography intent="text" className="pl-2">
                                Change Email
                            </Typography>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center px-4 py-2">
                            <FontAwesome6 name="key" size={18} color="black" />
                            <Typography intent="text" className="pl-2">
                                Change Password
                            </Typography>
                        </TouchableOpacity>
                    </View>

                    <View className="mb-5">
                        <View className="flex-row items-center mb-2">
                            <Typography intent="subtitle" className="text-base font-bold text-left">
                                Post
                            </Typography>
                            <View className="flex-1 h-px bg-gray-300 ml-2" />
                        </View>
                        <TouchableOpacity className="flex-row items-center px-4 py-2">
                            <FontAwesome6 name="list" size={18} color="black" />
                            <Typography intent="text" className="pl-2">
                                My Posts
                            </Typography>
                        </TouchableOpacity>
                    </View>

                    <View className="mb-5">
                        <View className="flex-row items-center mb-2">
                            <Typography intent="subtitle" className="text-base font-bold text-left">
                                Support
                            </Typography>
                            <View className="flex-1 h-px bg-gray-300 ml-2" />
                        </View>
                        <TouchableOpacity className="flex-row items-center px-4 py-2">
                            <FontAwesome6 name="circle-info" size={18} color="black" />
                            <Typography intent="text" className="pl-2">
                                Help Center
                            </Typography>
                        </TouchableOpacity>
                    </View>

                    <View className="mb-5">
                        <TouchableOpacity className="flex-row items-center px-4 py-2">
                            <Typography intent="text" className="text-red-500">
                                Logout
                            </Typography>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center px-4 py-2">
                            <Typography intent="text" className="text-red-500">
                                Delete Account
                            </Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Profile;
