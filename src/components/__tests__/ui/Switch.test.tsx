import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Switch from '@components/ui/Switch';

describe('when Switch is loaded', () => {
    it('should call onPress when pressed', () => {
        let value = false;
        const onSwitchMock = jest.fn(() => {
            value = !value;
        });

        render(<Switch value={value} onSwitch={onSwitchMock} />);
        const switchComponent = screen.getByTestId('switch');
        fireEvent.press(switchComponent);
        expect(onSwitchMock).toHaveBeenCalledTimes(1);
    });
});
