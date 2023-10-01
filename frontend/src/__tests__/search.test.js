import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import SearchPage from '../overlay/search/App';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'fetch-mock';
jest.setTimeout(20000)

const mockAPIdata = [[
  "kd",
  "0",
  "KD",
  "https://images.unsplash.com/photo-1691860305089-9a2566296202?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80",
  "kd@gmail.com"
],
[
  "test",
  "10001",
  "testingname",
  "https://images.unsplash.com/photo-1682314170732-2de75372c338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExOHx4SHhZVE1ITGdPY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "test@insta.in"
]
]

test('renders the SearchPage component', () => {
  render(<SearchPage />, { wrapper: BrowserRouter });
});

test('displays "No search results yet." with no input', () => {
  const { getByText } = render(<SearchPage />, { wrapper: BrowserRouter });
  const noResultsMessage = getByText('No search results yet.');
  expect(noResultsMessage).toBeInTheDocument();
});

test('displays search results for a valid input', async () => {
  fetchMock.mock('/api/search/users', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          body: mockAPIdata,
        });
      }, 5000);
    });
  });
  const { getByTestId, getByPlaceholderText, getByText } = render(<SearchPage />, { wrapper: BrowserRouter });
  const searchInput = getByPlaceholderText('Type to search...');
  fireEvent.change(searchInput, { target: { value: 'kd' } });
  await waitForElementToBeRemoved(() => screen.getByText("kd is currently not available on this platform"), { timeout: 10000 });
  const searchResults = getByTestId("search-results");
  expect(searchResults).toBeInTheDocument();
});

test('displays a "not available" message when there are no results', () => {
  const { getByTestId, getByPlaceholderText, getByText } = render(<SearchPage />, { wrapper: BrowserRouter });
  const searchInput = getByPlaceholderText('Type to search...');
  fireEvent.change(searchInput, { target: { value: 'NonExistentUser' } });
  const notAvailableMessage = getByText('NonExistentUser is currently not available on this platform');
  expect(notAvailableMessage).toBeInTheDocument();
});

test('navigates to the profile page when a search result is clicked', async () => {
  const { getByTestId, getByPlaceholderText } = render(<SearchPage />, { wrapper: BrowserRouter });
  const searchInput = getByPlaceholderText('Type to search...');
  fireEvent.change(searchInput, { target: { value: 'kd' } });
  await waitForElementToBeRemoved(() => screen.getByText("kd is currently not available on this platform"), { timeout: 10000 });
  const searchResult = getByTestId("search-box-result");
  fireEvent.click(searchResult);
});
