import { PropTypes } from 'prop-types';
import { useRef } from 'react';

const SearchField = ({ searchFunc }) => {
  SearchField.defaultProps = { searchFunc: () => { } };
  SearchField.propTypes = { searchFunc: PropTypes.func };
  const titleRef = useRef(null);
  const handleOnClick = () => {
    searchFunc(titleRef.current.value);
    titleRef.current.value = '';
  };
  return (
    <div className="input-container">
      <input className="search-box" ref={titleRef} placeholder="enter book title..." />
      <button className="search-button" type="button" onClick={handleOnClick}>Search</button>
    </div>
  );
};

export default SearchField;
