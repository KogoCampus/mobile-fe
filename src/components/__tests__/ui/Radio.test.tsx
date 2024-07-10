import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Radio from '@components/ui/Radio';

describe('Radio component', () => {
    it('should call onPress when pressed', () => {
        const onPressMock = jest.fn();
        render(<Radio label="Option 1" selected={false} onPress={onPressMock} />);

        const radioComponent = screen.getByText('Option 1');
        fireEvent.press(radioComponent);
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});
