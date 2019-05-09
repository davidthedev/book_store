import React from 'react';

import { Loader } from './Loader';

const URL = 'https://via.placeholder.com/150x250';
const BUTTON_TXT = 'Remove';

{/* <OverlayImage link={} item={} delete={}  /> */}

export const List = ({ items, deleteHandler }) => {
  return items.map((item) => {
    if (item.id !== 'loading') {
      const url = `${URL}/${item.bg}`;

      return (
        <article key={item.id}>
          <div className="item">
            <div className="overlay-img">
              <a href={item.url}>
                <img src={url} className="overlay-img__img" alt={item.title} />
                <div className="overlay-img__overlay"></div>
              </a>
              <div className="overlay-img__controls">
                <button
                  className="btn btn--delete"
                  data-id={item.id}
                  onClick={deleteHandler}>
                  {BUTTON_TXT}
                </button>
              </div>
            </div>
            <a href={item.url} className="link">
              <div className="item-meta">
                <p className="item-meta__title">{item.title}</p>
                <p className="item-meta__author">by {item.author}</p>
              </div>
            </a>
          </div>
        </article>
      );
    }

    return (
      <article className="item-loading" key="unique">
        <Loader />
      </article>
    );
  });
};
