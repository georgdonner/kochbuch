import React from 'react';
import PropTypes from 'prop-types';

import './ToastUndo.scss';

const ToastUndo = ({ label, undo, closeToast }) => {
  const handleClick = () => {
    undo();
    closeToast();
  };

  return (
    <div className="toast-undo">
      <span>{label}</span>
      <button type="button" onClick={handleClick}>Rückgängig</button>
    </div>
  );
};

ToastUndo.propTypes = {
  label: PropTypes.string.isRequired,
  undo: PropTypes.func.isRequired,
  closeToast: PropTypes.func,
};

ToastUndo.defaultProps = {
  closeToast: null,
};

export default ToastUndo;
