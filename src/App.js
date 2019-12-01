import React from 'react';
import logo from './logo.svg';
import './App.css';
import GlobalProvider from './stores/GlobalProvider';
import SearchProvider from './stores/SearchProvider';
import FormProvider from './stores/FormProvider';
import Search from './components/Search';
import Form from './components/Form';

function App() {
  return (
    <GlobalProvider>
      <SearchProvider>
        <Search />
      </SearchProvider>
      <FormProvider>
        <Form />
      </FormProvider>
    </GlobalProvider>
  );
}

export default App;
