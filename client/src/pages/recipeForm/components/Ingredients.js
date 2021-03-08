import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './Ingredients.scss';

const defaultIngr = { name: '', hint: '' };
const defaultSection = { name: '' };

const newSectionID = (sections = []) => {
  let n = -1;
  for (const section of sections) {
    const idNumber = parseInt(`0x${section._id}`, { radix: 16 });
    if (idNumber > n) {
      n = idNumber;
    }
  }
  return (n + 1).toString(16);
};

const Ingredients = ({ sections, ingredients, onChange }) => {
  const [newIngr, setNewIngr] = useState({ ...defaultIngr });
  const [newSection, setNewSection] = useState(defaultSection);
  const [newMode, setNewMode] = useState('ingredient');
  const newIngrRef = useRef(null);

  const ingredientsIndexed = ingredients.map((ingr, index) => ({ ...ingr, index }));
  const bySection = sections
    ? sections.map((section) => ({
      ...section,
      ingredients: ingredientsIndexed.filter((ingr) => ingr.s === section._id),
    }))
    : [{
      ingredients: ingredientsIndexed,
    }];

  const onIngrChange = (index, { name, hint }, sectionID) => {
    const ingredientsCopy = [...ingredients];
    ingredientsCopy[index] = {
      name,
      hint,
      ...(sectionID ? { s: sectionID } : {}),
    };
    onChange(ingredientsCopy, 'ingredients');
  };

  const addIngredient = ({ key }) => {
    if (key === 'Enter' && newIngr.name) {
      const ingredient = { ...newIngr };
      if (sections && sections.length) {
        ingredient.s = sections[sections.length - 1]._id;
      }
      onChange(ingredients.concat(ingredient), 'ingredients');
      setNewIngr({ ...defaultIngr });
      newIngrRef.current.focus();
    }
  };

  const removeIngredient = (index) => {
    onChange(ingredients.filter((_, i) => i !== index), 'ingredients');
  };

  const onSectionChange = (id, { name }) => {
    onChange(sections.map((section) => {
      if (section._id === id) {
        return { ...section, name };
      }
      return section;
    }));
  };

  const addSection = ({ key }) => {
    if (key === 'Enter' && newSection.name) {
      const section = {
        ...newSection,
        _id: newSectionID(sections),
      };
      console.log(sections);
      if (!sections || !sections.length) {
        console.log('map the ingredients');
        onChange(ingredients.map((ingr) => ({ ...ingr, s: section._id })), 'ingredients');
      }
      onChange((sections || []).concat(section), 'sections');
      setNewSection(defaultSection);
      setNewMode('ingredient');
      setTimeout(() => {
        newIngrRef.current.focus();
      }, 10);
    }
  };

  const removeSection = (id) => {
    const newSections = sections.filter(({ _id }) => _id !== id);
    const removedIndex = sections.findIndex(({ _id }) => _id === id);

    const newIngredients = ingredients
      .map((ingredient) => {
        if (ingredient.s !== id) {
          return ingredient;
        }
        const { s, ...ingr } = ingredient;
        if (newSections.length) {
          ingr.s = newSections[Math.min(0, removedIndex - 1)];
        }
        return ingr;
      });

    onChange(newSections, 'sections');
    onChange(newIngredients, 'ingredients');
  };

  return (
    <>
      <h2>Zutaten</h2>
      <div id="ingredients-container">
        <div id="ingredients">
          {bySection.map((section) => (
            <div key={section._id || 'none'}>
              {section._id ? (
                <div className="row section">
                  <b>Sektion:</b>
                  <input
                    type="text" placeholder="Sektion" value={section.name}
                    onChange={({ target }) => onSectionChange(section._id, { name: target.value })}
                  />
                  <button
                    type="button" className="remove"
                    onClick={() => removeSection(section._id)}
                  >
                    x
                  </button>
                </div>
              ) : null}
              {section.ingredients.map(({ name, hint, index }) => (
                <div className="row" key={index}>
                  <input
                    type="text" placeholder="Zutat" value={name}
                    onChange={
                      ({ target }) => onIngrChange(index, { name: target.value, hint }, section._id)
                    }
                  />
                  <input
                    type="text" placeholder="Hinweis" value={hint}
                    onChange={
                      ({ target }) => onIngrChange(index, { name, hint: target.value }, section._id)
                    }
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
          ))}
        </div>

        <label>
          Neue
          {' '}
          {newMode === 'ingredient' ? 'Zutat' : 'Sektion'}
        </label>
        <div className={['row', `new-${newMode}`].join(' ')}>
          {newMode === 'ingredient' ? (
            <>
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
            </>
          ) : (
            <input
              type="text" placeholder="Sektion z.B. 'Sauce'" value={newSection.name}
              onChange={({ target }) => setNewSection({ name: target.value })}
              onKeyDown={addSection}
            />
          )}
          <div className="select">
            <select
              value={newMode}
              onChange={(e) => setNewMode(e.target.value)}
            >
              <option value="ingredient">Zutat</option>
              <option value="section">Sektion</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    hint: PropTypes.string,
    s: PropTypes.string,
  })).isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  onChange: PropTypes.func.isRequired,
};

Ingredients.defaultProps = {
  sections: undefined,
};

export default Ingredients;
