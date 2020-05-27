import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';
import './PlanEntry.scss';

const PlanEntry = ({ entry }) => (
  <div className="plan-entry">
    <div className="data">
      <div className="meta">
        {`${entry.time} | ${entry.servings} Person${entry.servings !== 1 ? 'en' : ''}`}
      </div>
      {entry.custom ? (
        <div className="title">{entry.custom}</div>
      ) : (
        <Link className="title" to={`/recipe/${entry.recipe.id}?servings=${entry.servings}`}>
          {entry.recipe.title}
        </Link>
      )}
    </div>
    <div className="controls">
      <Link to={`/plan/${entry._id}/edit`}>
        <Icon name="edit" />
      </Link>
    </div>
  </div>
);

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
