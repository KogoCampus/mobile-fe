import { render, screen } from '@testing-library/react-native';
import TextField from '../../ui/TextField';

describe('when TextField is loaded', () => {
    it('should be rendered on screen', () => {
        render(<TextField intent="default" placeholder="testing" />);
        expect(screen.getByPlaceholderText('testing')).toBeDefined();
    });
});

// describe('when TextField is disabled', () => {
//     it('should be unable to press', () => {
//         render(<TextField intent="disabled" placeholder='testing'/>);
//         expect(screen.getByPlaceholderText("testing")).toHaveStyle('background-color: rgb(209 213 219)')
//     });
// });
