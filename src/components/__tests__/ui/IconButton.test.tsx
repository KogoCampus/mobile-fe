import { fireEvent, render, screen } from '@testing-library/react-native';
import IconButton from '../../ui/IconButton';

describe('when IconButton is loaded', () => {
    it('should be rendered on screen', () => {
        render(<IconButton intent="default" iconName="chevron-left" />);
        expect(screen.getByTestId('iconButton')).toBeDefined();
    });
});

describe('when IconButton is disabled', () => {
    it('should be unable to press', () => {
        const onPress = jest.fn();
        render(<IconButton intent="default" iconName="chevron-left" disabled onPress={onPress} />);
        fireEvent.press(screen.getByTestId('iconButton'));
        expect(onPress).toHaveBeenCalledTimes(0);
    });
});
