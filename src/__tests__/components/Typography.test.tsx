import { render, screen } from '@testing-library/react-native';
import Typography from '../../components/ui/Typography';

describe('when Typography is loaded', () => {
    it('should be rendered on screen', () => {
        render(<Typography intent="text">Lorem ipsum dolor sit amet</Typography>);
        expect(screen.getByText('Lorem ipsum dolor sit amet')).toBeTruthy();
    });
});
