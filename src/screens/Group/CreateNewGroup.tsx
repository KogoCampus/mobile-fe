import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import TextField from '@components/ui/TextField';
import Typography from '@components/ui/Typography';
import TextButton from '@components/ui/TextButton';
import Tag from '@components/ui/Tag';
import { useAlert } from '@components/ui/Alert/AlertContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppScreens, AppScreensParamList } from '@navigation/paramTypes';
import { AntDesign } from '@expo/vector-icons';

const schema = z.object({
    groupName: z.string().max(15),
    description: z.string().max(50),
    tags: z.array(z.string()).min(1).max(5),
});

type CreateGroupForm = z.infer<typeof schema>;

const CreateNewGroup = function (): JSX.Element {
    const navigation = useNavigation<StackNavigationProp<AppScreensParamList, AppScreens.CREATEGROUP_SCREEN>>();
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');
    const { showAlert } = useAlert();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CreateGroupForm>({
        resolver: zodResolver(schema),
    });

    const submitCB: SubmitHandler<CreateGroupForm> = async data => {
        try {
            navigation.navigate(AppScreens.GROUPLIST_SCREEN);
            showAlert('Group created successfully', { type: 'success' });
        } catch {
            showAlert('Failed to create group', { type: 'error' });
        }
    };

    const onError = () => {};

    const addTag = () => {
        if (tagInput && tags.length < 5) {
            const newTags = [...tags, tagInput];
            setTags(newTags);
            setTagInput('');
            setValue('tags', newTags);
        }
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        setValue('tags', newTags);
    };

    const handleKeyPress = (e: { nativeEvent: { key: string }; preventDefault: () => void }) => {
        if (e.nativeEvent.key === ' ') {
            e.preventDefault();
            addTag();
        }
    };

    const navigateBack = () => {
        navigation.navigate(AppScreens.GROUPLIST_SCREEN);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 p-5 w-full bg-white">
                <View className="relative flex-row items-center justify-center w-full mb-5">
                    <TouchableOpacity className="absolute left-0" onPress={navigateBack}>
                        <AntDesign name="close" size={30} color="black" />
                    </TouchableOpacity>
                    <Typography intent="subtitle" className="text-center">
                        New Group
                    </Typography>
                    <View className="absolute right-0">
                        <TextButton intent="default" size="sm" onPress={handleSubmit(submitCB, onError)}>
                            Done
                        </TextButton>
                    </View>
                </View>
                <View className="flex flex-col items-center">
                    <Controller
                        name="groupName"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                intent="default"
                                placeholder="Name"
                                className="w-11/12 mt-5 text-black"
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Typography intent="subtext" className="w-11/12 p-0 my-0 text-gray-500">
                        (max. 15 characters)
                    </Typography>
                    {errors.groupName?.message && (
                        <Typography intent="subtext" className="text-red-500">
                            {errors.groupName?.message as string}
                        </Typography>
                    )}
                    <Controller
                        name="description"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                intent="default"
                                placeholder="Short Description"
                                className="w-11/12 mt-5 text-black"
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Typography intent="subtext" className="w-11/12 p-0 my-0 text-gray-500">
                        (max. 50 characters)
                    </Typography>
                    {errors.description?.message && (
                        <Typography intent="subtext" className="text-red-500">
                            {errors.description?.message as string}
                        </Typography>
                    )}
                    <View className="w-11/12 mt-5">
                        <TextField
                            intent="default"
                            placeholder="Add a tag"
                            className="w-full text-black"
                            value={tagInput}
                            onChange={e => setTagInput(e.nativeEvent.text)}
                            onKeyPress={handleKeyPress}
                        />
                        <View className="flex-row flex-wrap mt-2">
                            {tags.map((tag, index) => (
                                <Tag key={index} onPress={() => removeTag(index)} className="mr-2 mb-2">
                                    {tag}
                                </Tag>
                            ))}
                        </View>
                    </View>
                    {errors.tags?.message && (
                        <Typography intent="subtext" className="text-red-500">
                            {errors.tags?.message as string}
                        </Typography>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateNewGroup;
