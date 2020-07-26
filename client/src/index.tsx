import React from 'react';
import ReactDOM from 'react-dom';
import * as sentry from '@sentry/browser';

import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import App from './App';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'production') {
  sentry.init({
    dsn: process.env.REACT_APP_SENTRY_CONFIG_DSN,
    environment: process.env.REACT_APP_CLIENT_ENVIRONMENT,
  });
}

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        const errMsg = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;

        sentry.captureMessage(errMsg);
      });
    }
    if (networkError) {
      // Todo: Logout the user for 401 http errors?
    }
  }),
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: undefined, // You can pass a token here like: token ? `Bearer ${token}` : null,
      },
    };
  }),
  createHttpLink({
    uri: '/graphql',
  }),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
