import { render, screen } from '@testing-library/react';
import AppLayout from './AppLayout';

const DummyPage = () => <div>Page</div>;

describe('AppLayout', () => {
  it('should render', async () => {
    render(
      <AppLayout>
        <DummyPage />
      </AppLayout>,
    );

    await screen.findByText('SKY Recommender Console');

    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });
});
