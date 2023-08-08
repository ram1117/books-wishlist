import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './BooksContainer.css';
import Modal from './Modal';
import React from 'react';

const BASE_URL = 'https://gutendex.com//books?search=';
const BooksContainer = ({ input }) => {
  const [booksData, setBooksData] = useState([]);
  const [toShowModal, setToShowModal] = useState(false);
  const [bId, setbId] = useState('');

  BooksContainer.defaultProps = { input: '' };
  BooksContainer.propTypes = { input: PropTypes.string };

  interface Book {
    id: number;
    title: string;
    authors: string;
  }

  const fetchFromApi = async (inputVal) => {
    if (input !== '') {
      const response = await fetch(new URL(BASE_URL + inputVal));
      const books = await response.json();
      const newArr: Book[] = [];
      books.results.forEach((element: Book) => {
        const { id, title, authors } = element;
        newArr.push({ id, title, authors });
      });
      setBooksData(newArr);
    }
  };

  useEffect(() => {
    fetchFromApi(input);
  }, [input]);

  const showModal = (e: Event) => {
    const element = e.target as HTMLElement;
    setToShowModal(true);
    if (element) {
      setbId(element.id);
    }
  };

  return (
    <div>
      <h1>Books list</h1>
      <div className="books-container">
        {booksData.map((book) => (
          <div className="book-tile" key={book.id}>
            <div className="book-details">
              {book.title}
              <button id={book.id} onClick={showModal} type="button">
                details..
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
      {toShowModal && <Modal bookId={bId} funcModal={setToShowModal} />}
    </div>
  );
};

export default BooksContainer;
