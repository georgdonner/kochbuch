import React from 'react';
import PropTypes from 'prop-types';
import { recipe as recipePropType } from '../../../utils/propTypes';

import { beautifulNumber } from '../modules/calcServings';

const Description = ({ recipe, servings }) => {
  const matches = recipe.description.match(/{(.+?)}/gm);
  let descrCopy = recipe.description;
  if (matches) {
    matches.forEach((match) => {
      const count = Number(match.replace(/({|})/g, ''));
      const newCount = count * (servings / recipe.servings);
      descrCopy = descrCopy.replace(match, beautifulNumber(newCount));
    });
  }

  return (
    <div>
      <h2>Zubereitung</h2>
      <div className="border-bottom" />
      <div className="description"
        dangerouslySetInnerHTML={{ __html: descrCopy }}
      />
    </div>
  );
};

Description.propTypes = {
  recipe: recipePropType.isRequired,
  servings: PropTypes.number.isRequired,
};

export default Description;
