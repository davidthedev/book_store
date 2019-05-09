import React from 'react';

export const Header = ({ modalHandler, addButtonText }) => {
  return (
    <div className="header">
      <h1 className="header__title">My books</h1>
      <button onClick={modalHandler} className="btn btn--add-book">
        {addButtonText}
      </button>
    </div>
  );
};
