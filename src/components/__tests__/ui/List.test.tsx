import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { List, ListItem, ListItemButton, ListItemText } from '@components/ui/List';

describe('List component', () => {
    it('should render the list', () => {
        render(
            <List intent="vertical">
                <ListItem>
                    <ListItemText primary="Item 1" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Item 2" />
                </ListItem>
            </List>,
        );

        expect(screen.getByText('Item 1')).toBeTruthy();
        expect(screen.getByText('Item 2')).toBeTruthy();
    });

    it('should call onPress when pressed', () => {
        const onPressMock = jest.fn();

        render(
            <List intent="vertical">
                <ListItem>
                    <ListItemButton onPress={onPressMock}>
                        <ListItemText primary="Click" />
                    </ListItemButton>
                </ListItem>
            </List>,
        );

        const buttonItem = screen.getByText('Click');

        fireEvent.press(buttonItem);
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});
