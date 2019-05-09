import React from 'react';

const renderSvg = () => {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle className="spinner__circle" strokeOpacity=".5" cx="18" cy="18" r="18"/>
          <path className="spinner__dynamic" d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"/>
          </path>
        </g>
      </g>
    </svg>
  );
};

export const Loader = ({ type }) => {
  return (
    <div className="spinner">
      { renderSvg() }
    </div>
  );
};
