import { render, screen } from '@testing-library/react-native';
import TextArea from '../../ui/TextArea';

describe('when TextArea is loaded', () => {
    it('should be rendered on screen', () => {
        render(<TextArea intent="default" placeholder="testing" />);
        expect(screen.getByPlaceholderText('testing')).toBeDefined();
    });
});

// describe('when TextArea is disabled', () => {
//     it('should be unable to press', () => {
//         render(<TextArea intent="disabled" placeholder='testing'/>);
//         expect(screen.getByPlaceholderText("testing")).toHaveAttribute('disabled')
//     });
// });
