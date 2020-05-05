import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './Ingredients.scss';

const defaultIngr = { name: '', hint: '' };

const Ingredients = ({ ingredients, onChange }) => {
  const [newIngr, setNewIngr] = useState({ ...defaultIngr });
  const newIngrRef = useRef(null);

  const onIngrChange = (index, { name, hint }) => {
    const ingredientsCopy = [...ingredients];
    ingredientsCopy[index] = { name, hint };
    onChange(ingredientsCopy);
  };

  const addIngredient = ({ key }) => {
    if (key === 'Enter' && newIngr.name) {
      onChange(ingredients.concat(newIngr));
      setNewIngr({ ...defaultIngr });
      newIngrRef.current.focus();
    }
  };

  const removeIngredient = (index) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  return (
    <>
      <h2>Zutaten</h2>
      <div id="ingredients-container">
        <div id="ingredients">
          {ingredients.map(({ name, hint }, index) => (
            <div className="ingredient" key={index}>
              <input
                type="text" placeholder="Zutat" value={name}
                onChange={({ target }) => onIngrChange(index, { name: target.value, hint })}
              />
              <input
                type="text" placeholder="Hinweis" value={hint}
                onChange={({ target }) => onIngrChange(index, { name, hint: target.value })}
              />
              <button
                type="button" className="remove"
                onClick={() => removeIngredient(index)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <label>Neue Zutat</label>
        <div id="new-ingredient" className="ingredient">
          <input
            type="text" placeholder="Zutat" value={newIngr.name}
            onChange={({ target }) => setNewIngr({ name: target.value, hint: newIngr.hint })}
            onKeyDown={addIngredient} ref={newIngrRef}
          />
          <input
            type="text" placeholder="Hinweis" value={newIngr.hint}
            onChange={({ target }) => setNewIngr({ name: newIngr.name, hint: target.value })}
            onKeyDown={addIngredient}
          />
        </div>
      </div>
    </>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    hint: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Ingredients;
