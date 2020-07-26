import React from 'react';
import logo from './logo.svg';
import './App.css';

import { gql, useQuery } from '@apollo/client';
const query = gql`
  {
    sample {
      hello
    }
  }
`;
function SampleComponent() {
  const { data, loading, error } = useQuery(query);

  if (loading) {
    return <>Please wait - GraphQL Data Loading</>;
  }

  if (error) {
    console.error(error);

    return (
      <>
        An Error occured: Check the console. It could be that the server is
        offline, start the server and refresh.
      </>
    );
  }

  return <>Data Fetched: {data.sample.hello}</>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SampleComponent />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
