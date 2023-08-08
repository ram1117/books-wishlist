import PropTypes from 'prop-types';
import React from 'react';
import { useEffect, useState } from 'react';

const BOOK_URL = 'https://gutendex.com//books/';
const Modal = ({ bookId, funcModal }) => {
  Modal.defaultProps = { bookId: '', funcModal: null };
  Modal.propTypes = { bookId: PropTypes.string, funcModal: PropTypes.func };
  const [bookData, setBookData] = useState([]);
  const fetchBookDetails = async (id) => {
    if (id !== '') {
      const response = await fetch(new URL(BOOK_URL + id));
      const bookDetail = await response.json();
      setBookData(bookDetail);
    }
  };
  useEffect(() => {
    fetchBookDetails(bookId);
  }, [bookId]);

  const onHandleClick = () => {
    funcModal(false);
  };

  if (bookData.length !== 0) {
    return (
      <>
        <div className="popup-wrapper">
          <div className="popup">
            <h1>{bookData.title}</h1>
            <img className="img-logo" src={bookData.formats['image/jpeg']} alt="book thumbnail" />

            <div className="data-row">
              <p className="column1">Author</p>
              <div className="column2">
                {bookData.authors.map((author) => <p key={author}>{author.name}</p>)}
              </div>
            </div>
            <div className="data-row">
              <p className="column1">Subject</p>
              <div className="column2">
                {bookData.subjects.map((subject) => <p key={subject}>{subject}</p>)}
              </div>
            </div>
            <button type="button" onClick={onHandleClick}>Close</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="popup-wrapper">
        <div className="popup">
          <h1>{bookData.title}</h1>
          <button type="button" onClick={onHandleClick}>Close</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
