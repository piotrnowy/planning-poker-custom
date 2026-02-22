/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toolbar } from './Toolbar';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Toolbar component', () => {
  // const { location } = window;
  // beforeAll(() => {
  //   // @ts-ignore
  //   delete window.location;
  //   // @ts-ignore
  //   window.location = { href: '' };
  // });

  // afterAll((): void => {
  //   // @ts-ignore
  //   window.location = location;
  // });
  it('should render correct title', () => {
    render(<Toolbar />);
    const title = screen.getByText('Planning Poker');
    expect(title).toBeInTheDocument();
  });
  it('should render theme control button', () => {
    render(<Toolbar />);
    const themeButton = screen.getByTestId('toolbar.menu.theme');
    expect(themeButton).toBeInTheDocument();
  });
  it('should navigate to home page when Title is clicked clicked', () => {
    render(<Toolbar />);
    const title = screen.getByText('Planning Poker');
    userEvent.click(title);
    expect(mockHistoryPush).toBeCalledWith('/');
  });
  // it('should navigate to github page when Github icon is clicked clicked', () => {
  //   // @ts-ignore
  //   delete window.location;
  //   // @ts-ignore
  //   window.location = { href: '' };
  //   const view = render(<Toolbar />);
  //   const title = view.getByText('GitHub') as HTMLElement;
  //   userEvent.click(title);
  //   expect(window.location.href).toEqual('https://github.com/hellomuthu23/planning-poker');
  // });
});
