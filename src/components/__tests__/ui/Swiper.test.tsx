import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Swiper from '@components/ui/Swiper';
import { Text, Dimensions } from 'react-native';

Dimensions.get = jest.fn().mockReturnValue({ width: 300, height: 600 });

describe('Swiper component', () => {
    it('should render the swiper', () => {
        render(
            <Swiper direction="horizontal">
                <Text>Slide 1</Text>
                <Text>Slide 2</Text>
                <Text>Slide 3</Text>
            </Swiper>,
        );

        expect(screen.getByText('Slide 1')).toBeTruthy();
        expect(screen.getByText('Slide 2')).toBeTruthy();
        expect(screen.getByText('Slide 3')).toBeTruthy();
    });

    it('should call onIndexChanged when swiped', () => {
        const onIndexChangeMock = jest.fn();

        render(
            <Swiper direction="horizontal" onIndexChanged={onIndexChangeMock}>
                <Text>Slide 1</Text>
                <Text>Slide 2</Text>
                <Text>Slide 3</Text>
            </Swiper>,
        );

        const scrollView = screen.getByTestId('swiper-scroll-view');

        fireEvent.scroll(scrollView, {
            nativeEvent: {
                contentOffset: { x: 300, y: 0 },
                contentSize: { width: 900, height: 600 },
                layoutMeasurement: { width: 300, height: 600 },
            },
        });

        expect(onIndexChangeMock).toHaveBeenCalledWith(1);

        fireEvent.scroll(scrollView, {
            nativeEvent: {
                contentOffset: { x: 600, y: 0 },
                contentSize: { width: 900, height: 600 },
                layoutMeasurement: { width: 300, height: 600 },
            },
        });

        expect(onIndexChangeMock).toHaveBeenCalledWith(2);
    });
});
