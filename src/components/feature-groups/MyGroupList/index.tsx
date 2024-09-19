import React from 'react';
import { View } from 'react-native';
import { useMyGroup } from '@hooks-api/groups/UseMyGroups';
import Skeleton from '@components/ui/Skeleton';
import GroupPreview from '../GroupPreview';
import { List } from '@components/ui/List';
import { Group } from './types';
import Typography from '@components/ui/Typography';

interface MyGroupListProps {
    onGroupPress: (groupId: string) => void;
}

const MyGroupList: React.FC<MyGroupListProps> = ({ onGroupPress }) => {
    const { data: queryData, isLoading } = useMyGroup();

    if (isLoading) {
        return (
            <View className="p-4">
                <Skeleton intent="rounded" width={350} height={74} />
            </View>
        );
    }

    if (!queryData || !Array.isArray(queryData.data)) {
        return (
            <View className="flex-1 justify-center items-center">
                <Typography>No Groups Found</Typography>
            </View>
        );
    }

    const data: Group[] = queryData.data;

    const renderGroup = ({ item }: { item: Group }) => (
        <GroupPreview
            key={item.id}
            width={390}
            height={74}
            imageLink={item.profileImage?.url || ''}
            groupName={item.topicName}
            groupDescription={item.description}
            numOfMembers={item.userCount}
            onPress={() => onGroupPress(item.id)}
        />
    );

    return (
        <View>
            <List>{data.map(item => renderGroup({ item }))}</List>
        </View>
    );
};

export default MyGroupList;
