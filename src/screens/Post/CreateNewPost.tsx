import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import TextField from '@components/ui/TextField';
import Button from '@components/ui/TextButton';
import useNavigation from '@navigation/useNavigation';
import Typography from '@components/ui/Typography';
import { AntDesign } from '@expo/vector-icons';
import TextArea from '@components/ui/TextArea';

function CreateNewPost(): JSX.Element {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedGroup] = useState('');
    const [selectedGroupName] = useState('');
    // const [selectedGroup, setSelectedGroup] = useState('');
    // const [selectedGroupName, setSelectedGroupName] = useState('');
    const navigation = useNavigation();

    const onSubmit = async () => {};

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 p-5 w-full bg-white">
                <View className="relative flex-row items-center justify-center w-full mb-5">
                    <TouchableOpacity className="absolute left-0" onPress={() => navigation.goBack()}>
                        <AntDesign name="close" size={30} color="black" />
                    </TouchableOpacity>
                    <Typography intent="subtitle" className="text-center">
                        New Post
                    </Typography>
                    <View className="absolute right-0">
                        <Button intent="default" size="sm" onPress={onSubmit}>
                            Done
                        </Button>
                    </View>
                </View>
                <View>
                    {selectedGroup ? (
                        <Typography intent="subtext" className="mb-3 font-bold">
                            Selected group: {selectedGroupName}
                        </Typography>
                    ) : (
                        <Typography intent="subtext" className="mb-3 font-bold">
                            Select a group
                        </Typography>
                    )}
                </View>
                <TextField
                    intent="default"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.nativeEvent.text)}
                    className="my-2 w-full text-black"
                />
                <TextArea
                    intent="default"
                    placeholder="What do you want to share today?"
                    value={content}
                    onChange={e => setContent(e.nativeEvent.text)}
                    className="my-2 w-full h-24 text-black text-top"
                />
            </ScrollView>
        </SafeAreaView>
    );
}

export default CreateNewPost;
