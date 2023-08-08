import './App.css';
import { useState } from 'react';
import SearchField from './components/SearchField';
import BooksContainer from './components/BooksContainer';
import React from 'react';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <div className="App">
      <SearchField searchFunc={setSearchInput} />
      <BooksContainer input={searchInput} />
    </div>
  );
};

export default App;
