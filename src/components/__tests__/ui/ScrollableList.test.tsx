import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { ScrollableList, ListItem } from '@components/ui/ScrollableList';
import { Text } from 'react-native';

describe('ScrollableList component', () => {
    it('should render the list', () => {
        render(
            <ScrollableList intent="vertical">
                <ListItem>
                    <Text>Item 1</Text>
                </ListItem>
                <ListItem>
                    <Text>Item 2</Text>
                </ListItem>
            </ScrollableList>,
        );

        expect(screen.getByText('Item 1')).toBeTruthy();
        expect(screen.getByText('Item 2')).toBeTruthy();
    });

    it('should call onScroll when scrolled', () => {
        const onScrollMock = jest.fn();

        render(
            <ScrollableList intent="vertical" onScroll={onScrollMock} testID="scrollable">
                <ListItem>
                    <Text>Item 1</Text>
                </ListItem>
                <ListItem>
                    <Text>Item 2</Text>
                </ListItem>
            </ScrollableList>,
        );

        const scrollableList = screen.getByTestId('scrollable');

        fireEvent.scroll(scrollableList, {
            nativeEvent: {
                contentOffset: { y: 100, x: 0 },
                contentSize: { height: 1000, width: 100 },
                layoutMeasurement: { height: 500, width: 100 },
            },
        });

        expect(onScrollMock).toHaveBeenCalled();
    });
});
