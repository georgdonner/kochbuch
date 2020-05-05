import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Description = ({ value, onChange }) => {
  const textarea = useRef(null);
  useEffect(() => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = `${textarea.current.scrollHeight}px`;
  });

  return (
    <>
      <h2>Beschreibung</h2>
      <textarea
        value={value}
        ref={textarea} rows="6" placeholder="Markdown verfügbar"
        style={{ overflowY: 'hidden' }}
        onChange={({ target }) => {
          onChange(target.value);
        }}
      />
    </>
  );
};

Description.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Description;
