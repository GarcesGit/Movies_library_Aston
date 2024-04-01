import React from 'react';

export const Loader = () => {
  return (
    <div>
      <button className="btn btn-dark" type="button" disabled>
        <span
          className="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Загрузка...
      </button>
    </div>
  );
};
