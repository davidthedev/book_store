import React from 'react';

/**
 * 
 * We will be using a modal here for now.
 * When the process of adding a book becomes more complex,
 * we will start using ReactRouter and create a new route.
 * 
 */

export const Modal = ({ addHandler, dismissHandler, isHidden }) => {
  if (!isHidden) {
    return (
      <div className="modal">
        <form className="modal-wrapper" onSubmit={addHandler}>
          <input name="author" className="input-field" placeholder="Book author" />
          <input name="title" className="input-field" placeholder="Book title" />
          <button type="submit" className="btn btn--modal btn--add">Add a Book</button>
          <button type="button" onClick={dismissHandler} className="btn btn--modal btn--cancel">Don't Add</button>
        </form>
      </div>
    );
  }

  return null;
};
