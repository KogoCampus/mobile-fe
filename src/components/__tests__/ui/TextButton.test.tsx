import { fireEvent, render, screen } from '@testing-library/react-native';
import TextButton from '../../ui/TextButton';

describe('when TextButton is loaded', () => {
    it('should be rendered on screen', () => {
        render(<TextButton intent="default">Hello</TextButton>);
        expect(screen.getByText('Hello')).toBeDefined();
    });
});

describe('when TextButton is disabled', () => {
    it('should be unable to press', () => {
        const onPress = jest.fn();
        render(
            <TextButton intent="default" disabled onPress={onPress}>
                Disabled
            </TextButton>,
        );
        fireEvent.press(screen.getByText('Disabled'));
        expect(onPress).toHaveBeenCalledTimes(0);
    });
});
