import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

const BOOK_URL = 'https://gutendex.com//books?search=';
const BooksContainer = ({ input }) => {
  const [booksData, setBooksData] = useState([]);
  BooksContainer.defaultProps = { input: '' };
  BooksContainer.propTypes = { input: PropTypes.string };

  const fetchFromApi = async (inputVal) => {
    if (input !== '') {
      const response = await fetch(new URL(BOOK_URL + inputVal));
      const books = await response.json();
      const newArr = [];
      books.results.forEach((element) => {
        const { id, title, authors } = element;
        newArr.push({ id, title, authors });
      });
      console.log(newArr);
      setBooksData(newArr);
    }
  };

  useEffect(() => {
    fetchFromApi(input);
  }, [input]);

  return (
    <div>
      <h1>Books list</h1>
      <div className="books-container">
        {booksData.map((book) => (
          <>
            <p key={book.id}>
              {book.id}
              {book.title}
            </p>
            <hr />
          </>
        ))}
      </div>

    </div>
  );
};

export default BooksContainer;
