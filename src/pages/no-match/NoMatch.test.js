import { render, screen } from '@testing-library/react';
import NoMatch from './NoMatch';

describe('NoMatch page', () => {
  it('should render', async () => {
    render(<NoMatch />);

    await screen.findByText('Page not found.');

    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });
});
