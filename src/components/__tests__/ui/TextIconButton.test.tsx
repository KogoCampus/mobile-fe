import { fireEvent, render, screen } from '@testing-library/react-native';
import TextIconButton from '@components/ui/TextIconButton';

describe('when TextIconButton is loaded', () => {
    it('should be rendered on screen', () => {
        render(
            <TextIconButton intent="default" iconName="at">
                Hello
            </TextIconButton>,
        );
        expect(screen.getByText('Hello')).toBeDefined();
    });
});

describe('when TextIconButton is disabled', () => {
    it('should be unable to press', () => {
        const onPress = jest.fn();
        render(
            <TextIconButton intent="default" iconName="at" disabled onPress={onPress}>
                Disabled
            </TextIconButton>,
        );
        fireEvent.press(screen.getByText('Disabled'));
        expect(onPress).toHaveBeenCalledTimes(0);
    });
});
