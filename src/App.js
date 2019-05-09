import React, { useState, useEffect } from "react";

import { List } from "./components/List";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";

// dummy data
import storeBooks from "./data.js";

import "./styles.css";

let lastId = 5;

export const App = () => {
  /**
   * useState() - lets add state to function component
   *
   * book is the new state variable state
   * addBook() is the function to update the state
   *
   * useState([]) - [] is the default value
   */
  const [books, addBook] = useState([]);
  const [isModalHidden, shouldHideModal] = useState(true);
  const [isFetched, isFetching] = useState(false);

  /**
   * useEffect() - performs side effects in function components (example: API call)
   *
   * we pass [] as a second argument to denote that
   * this effect (for example an API call) does not depend on
   * any props or state and will only run once
   */
  useEffect(() => {
    // we use IIFE to run the async function
    (async () => {
      isFetching(true);

      try {
        const data = await getData();
        isFetching(false);

        addBook(data);
      } catch (err) {
        console.log(`$Error: ${err.message}`);
      }
    })();
  }, []);

  // simulate GET request
  const getData = () => {
    return new Promise((resolve, reject) => {
      // make GET request

      setTimeout(() => {
        return resolve(storeBooks);
      }, 1000);
    });
  };

  // simulate DELETE request
  const deleteData = () => {
    return new Promise((resolve, reject) => {
      return setInterval(() => {
        // make DELETE request

        const response = {
          status: 200
        };

        resolve(response);
      }, 1000);
    });
  };

  // simulate POST request
  const postData = newBook => {
    return new Promise(resolve => {
      // make POST request
      setTimeout(() => {
        const response = {
          status: 200,
          data: newBook
        };

        return resolve(response);
      }, 1000);
    });
  };

  const handleAddEvent = e => {
    e.preventDefault();

    lastId += 1;

    const newBook = {
      id: lastId.toString(), // this ID will be created on the server,
      bg: "551A8B", // could be just randomised
      author: e.target.elements.author.value,
      title: e.target.elements.title.value
    };

    (async () => {
      try {
        shouldHideModal(true);
        isFetching(true);

        // addLoadingArticle();

        // simulate POST request
        const response = await postData(newBook);

        if (response.status === 200) {
          // if we want to render a loader display in a specific place
          // const state = books.filter((book) => {
          //   if (book.id !== 'loading') {
          //     return book;
          //   }
          // });

          isFetching(false);

          addBook([...books, response.data]);
        }
      } catch (err) {
        console.log(`$Error: ${err.message}`);
      }
    })();
  };

  const handleDimissEvent = () => {
    shouldHideModal(true);
  };

  const handleModal = () => {
    if (isModalHidden) {
      shouldHideModal(false);
    } else {
      shouldHideModal(true);
    }
  };

  const deleteItem = e => {
    const idToDelete = e.target.dataset.id;

    (async () => {
      isFetching(true);

      try {
        const dataDeleted = await deleteData();
        if (dataDeleted.status === 200) {
          const updatedBooks = books.filter(book => {
            return book.id !== idToDelete;
          });

          isFetching(false);

          lastId = parseInt(updatedBooks[updatedBooks.length - 1].id);

          addBook(updatedBooks);
        }
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    })();
  };

  const getModalState = () => {
    if (isModalHidden) {
      return ["Add a Book", { display: "none" }];
    }

    return ["Close dialog", { display: "block" }];
  };

  const renderSvg = () => {
    return (
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fff"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle
              className="spinner__circle"
              strokeOpacity=".5"
              cx="18"
              cy="18"
              r="18"
            />
            <path className="spinner__dynamic" d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    );
  };

  const renderLoader = () => {
    return <div className="spinner">{renderSvg()}</div>;
  };

  const renderBody = () => {
    if (!isFetched) {
      return (
        <div className="body">
          <List items={books} deleteHandler={deleteItem} svg={renderSvg()} />
        </div>
      );
    }

    return renderLoader();
  };

  return (
    <React.Fragment>
      <Modal
        isHidden={isModalHidden}
        addHandler={handleAddEvent}
        dismissHandler={handleDimissEvent}
      />
      {isModalHidden ? (
        <div className="wrapper">
          <Header
            modalHandler={handleModal}
            addButtonText={getModalState()[0]}
          />
          {renderBody()}
        </div>
      ) : null}
    </React.Fragment>
  );
};
