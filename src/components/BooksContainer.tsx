import { useEffect, useState } from 'react';
import './BooksContainer.css';
import Modal from './Modal';
import React from 'react';
import { BookData } from './types';

type BooksContainerProp = {
  input: '';
};
const defaultProps = { input: '' };

const BASE_URL = 'https://gutendex.com//books?search=';
const BooksContainer = ({
  input,
}: BooksContainerProp & typeof defaultProps) => {
  const [booksData, setBooksData] = useState<BookData[]>([]);
  const [toShowModal, setToShowModal] = useState(false);
  const [bId, setbId] = useState('');

  const fetchFromApi = async (inputVal) => {
    if (input !== '') {
      const response = await fetch(new URL(BASE_URL + inputVal));
      const books = await response.json();
      const newArr: BookData[] = [];
      books.results.forEach((element: BookData) => {
        const { id, title, authors } = element;
        newArr.push({ id, title, authors });
      });
      setBooksData(newArr);
    }
  };

  useEffect(() => {
    fetchFromApi(input);
  }, [input]);

  const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
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
              <button id={`${book.id}`} onClick={showModal} type="button">
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
