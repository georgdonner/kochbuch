import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Categories.scss';

const Categories = ({ categories, onChange }) => {
  const filtered = categories.filter((ctg) => ctg !== 'Vegetarisch' && ctg !== 'Vegan');

  const [allCategories, setAll] = useState();
  const [query, setQuery] = useState('');
  useEffect(() => {
    fetch('/api/recipes/categories')
      .then((res) => res.json())
      .then((result) => {
        setAll(result);
      });
  }, []);

  const addCategory = (ctg) => {
    onChange(categories.concat(ctg));
    setQuery('');
  };

  return allCategories ? (
    <>
      <h2>Kategorien</h2>
      <div id="categories-container">
        <div id="categories">
          {filtered.map((ctg) => (
            <div key={ctg}>
              <span className="ctg">{ctg}</span>
              <button
                type="button" className="remove"
                onClick={() => {
                  onChange(categories.filter((c) => c !== ctg));
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <label htmlFor="category">Neue Kategorie</label>
        <input
          type="text" name="category" autoComplete="off"
          placeholder="Enter drücken zum Hinzufügen"
          value={query}
          onChange={({ target }) => {
            setQuery(target.value);
          }}
          onKeyDown={({ key }) => {
            if (key === 'Enter' && query) {
              addCategory(query);
            }
          }}
        />
        <div id="autocomplete-items">
          {query ? allCategories
            .filter((ctg) => ctg.toLowerCase().startsWith(query.toLowerCase()))
            .map((ctg) => (
              <div key={`${ctg}-auto`} onClick={() => addCategory(ctg)}>{ctg}</div>
            )) : null}
        </div>
      </div>
    </>
  ) : null;
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Categories;
