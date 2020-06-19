import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';
import './PlanEntry.scss';

const PlanEntry = ({ entry }) => {
  const dragStart = (e) => {
    e.dataTransfer.setData('text/plain', entry._id);
  };
  const drag = (e) => {
    if (e.clientY < 250) {
      window.scrollBy({ top: -30, behavior: 'smooth' });
    }
    if (e.clientY > (window.innerHeight - 150)) {
      window.scrollBy({ top: 30, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="plan-entry draggable" id={entry._id}
      draggable="true"
      onDragStart={dragStart}
      onDrag={drag}
    >
      <div className="data">
        <div className="meta">
          {`${entry.time} | ${entry.servings} Person${entry.servings !== 1 ? 'en' : ''}`}
        </div>
        {entry.recipe ? (
          <Link
            className="title draggable" draggable="true"
            to={`/recipe/${entry.recipe.id}?servings=${entry.servings}`}
            onContextMenu={(e) => {
              e.preventDefault();
            }}
            onDragStart={dragStart}
            onDrag={drag}
          >
            {entry.recipe.title}
          </Link>
        ) : (
          <div className="title">{entry.custom || ''}</div>
        )}
      </div>
      <div className="controls">
        <Link to={`/plan/${entry._id}/edit`}>
          <Icon name="edit" />
        </Link>
      </div>
    </div>
  );
};

export default PlanEntry;

PlanEntry.propTypes = {
  entry: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired,
    custom: PropTypes.string,
    recipe: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
