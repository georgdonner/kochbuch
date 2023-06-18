import React from 'react';
import PropTypes from 'prop-types';

const VeggieOptions = ({ categories, setCategories }) => {
  const options = ['Vegetarisch', 'Vegan'];

  return (
    <div id="veggie-options">
      {options.map((option) => (
        <label className="input-container" key={option}>
          {option}
          <input
            type="checkbox" checked={categories.includes(option)}
            onChange={(e) => {
              setCategories(e.target.checked
                ? categories.concat(option)
                : categories.filter((c) => c !== option));
            }}
          />
          <span className="checkmark box" />
        </label>
      ))}
    </div>
  );
};

VeggieOptions.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCategories: PropTypes.func.isRequired,
};

export default VeggieOptions;
