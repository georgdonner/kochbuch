import React from 'react';
import PropTypes from 'prop-types';

const Difficulty = ({ difficulty, onChange }) => {
  const buttons = [
    { value: 1, label: 'Einfach' },
    { value: 2, label: 'Mittel' },
    { value: 3, label: 'Schwer' },
  ];

  return (
    <div>
      <form id="difficulty">
        {buttons.map(({ label, value }) => (
          <label className="input-container" key={label}>
            <span className="content">{label}</span>
            <input
              type="radio" name="difficulty" value={value}
              checked={difficulty === value}
              onChange={(e) => onChange(Number(e.target.value))}
            />
            <span className="checkmark radio" />
          </label>
        ))}
      </form>
    </div>
  );
};

Difficulty.propTypes = {
  difficulty: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Difficulty;
