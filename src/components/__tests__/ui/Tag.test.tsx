import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Tag from '@components/ui/Tag';

describe('Tag component', () => {
    it('should render the tag', () => {
        render(<Tag>Example</Tag>);

        expect(screen.getByText('Example')).toBeTruthy();
    });

    it('should call onPress when the tag is pressed', () => {
        const onPressMock = jest.fn();

        render(<Tag onPress={onPressMock}>Example</Tag>);

        const tagComponent = screen.getByText('Example');

        fireEvent.press(tagComponent);
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});
