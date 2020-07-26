import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import App from './App';

test('renders learn react link', () => {
  render(
    <MockedProvider mocks={[]}>
      <App />
    </MockedProvider>,
  );

  expect(screen.getByText(/learn react/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Please wait - GraphQL Data Loading/i),
  ).toBeInTheDocument();
});
