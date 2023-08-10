import React from 'react';
import { useRef } from 'react';

type SearchFieldProp = {
  searchFunc: Function;
};

const SearchField = ({ searchFunc }: SearchFieldProp) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const handleOnClick = () => {
    if (titleRef.current) {
      searchFunc(titleRef.current.value);
      titleRef.current.value = '';
    }
  };
  return (
    <div className="input-container">
      <input
        className="search-box"
        ref={titleRef}
        placeholder="enter book title..."
      />
      <button className="search-button" type="button" onClick={handleOnClick}>
        Search
      </button>
    </div>
  );
};

export default SearchField;
