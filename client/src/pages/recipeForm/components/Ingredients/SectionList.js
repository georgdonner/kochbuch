import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ReactSortable } from 'react-sortablejs';

import Icon from '../../../../components/Icon';

const SectionList = ({
  ingredients, sectionID, moveIngredient, onIngrChange, removeIngredient,
}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(ingredients.map((ingr) => ({ ...ingr, id: ingr.name })));
  }, [ingredients]);

  return (
    <ReactSortable
      list={list} setList={setList}
      group="ingredients" id={sectionID} handle=".icon"
      onUpdate={({ oldIndex, newIndex, to }) => {
        moveIngredient({
          oldIndex: (ingredients[0]?.index || 0) + oldIndex,
          targetSectionIndex: newIndex,
          targetSectionID: to.id,
        });
      }}
      onRemove={({ oldIndex, newIndex, to }) => {
        moveIngredient({
          oldIndex: (ingredients[0]?.index || 0) + oldIndex,
          targetSectionIndex: newIndex,
          targetSectionID: to.id,
        });
      }}
    >
      {list.map(({ name, hint, index }) => (
        <div className="row" key={name}>
          <Icon name="menu" color="#333" />
          <input
            type="text" placeholder="Zutat" value={name}
            onChange={({ target }) => onIngrChange(
              index, { name: target.value, hint }, sectionID,
            )}
          />
          <input
            type="text" placeholder="Hinweis" value={hint}
            onChange={({ target }) => onIngrChange(
              index, { name, hint: target.value }, sectionID,
            )}
          />
          <button
            type="button" className="remove"
            onClick={() => removeIngredient(index)}
          >
            x
          </button>
        </div>
      ))}
    </ReactSortable>
  );
};

SectionList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    hint: PropTypes.string,
    s: PropTypes.string,
    index: PropTypes.number.isRequired,
  })).isRequired,
  sectionID: PropTypes.string,

  moveIngredient: PropTypes.func.isRequired,
  onIngrChange: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
};

SectionList.defaultProps = {
  sectionID: undefined,
};

export default SectionList;
