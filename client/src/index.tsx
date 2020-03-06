import React from 'react';
import ReactDOM from 'react-dom';
import * as sentry from '@sentry/browser';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

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
