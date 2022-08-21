import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipe as recipePropType } from '../../../utils/propTypes';

import { getDayStr } from '../../../utils/date';
import './RecipeCard.scss';

const responsiveImg = (recipe) => {
  const imgUrl = (width) => recipe.image.replace(/\d+.jpg/, `${width}.jpg`);

  return recipe.image ? (
    <img
      srcSet={`${imgUrl(1600)} 1600w,
      ${imgUrl(1000)} 1000w,
      ${imgUrl(800)} 800w,
      ${imgUrl(400)} 400w`}
      sizes="(min-width: 1200px) 400px,
      (min-width: 600px) 50vw,
      100vw"
      src={imgUrl(800)}
      alt={recipe.title}
      crossOrigin="anonymous"
    />
  ) : (
    <img src="img/comingsoon.jpg" alt="Bild kommt bald" />
  );
};

const RecipeCard = ({ recipe, date, servings }) => {
  const vegetarian = recipe.categories.includes('Vegetarisch');
  const vegan = recipe.categories.includes('Vegan');
  const filteredCtg = recipe.categories
    .filter((ctg) => ctg !== 'Vegan' && ctg !== 'Vegetarisch');

  return (
    <Link
      className="recipe-card" id={recipe._id}
      to={{
        pathname: `/recipe/${recipe._id}${servings ? `?servings=${servings}` : ''}`,
        state: { fromHome: true },
      }}
    >
      {responsiveImg(recipe)}
      {date ? (
        <div className="date">
          <svg width="150" height="200" viewBox="0 0 150 200">
            <polygon points="150,200 0,200 150,100" />
            <polygon points="150,100 0,0 150,0" />
          </svg>
          <span>{getDayStr(date)}</span>
        </div>
      ) : null}
      <h2>
        {vegetarian || vegan
          ? <span className={vegan ? 'vegan' : 'vegetarian'}>{recipe.title}</span>
          : recipe.title}
      </h2>
      {filteredCtg.length > 0
        ? <footer>{filteredCtg.map((ctg) => <span key={ctg}>{ctg}</span>)}</footer>
        : null}
    </Link>
  );
};

RecipeCard.propTypes = {
  recipe: recipePropType.isRequired,
  servings: PropTypes.number,
  date: PropTypes.instanceOf(Date),
};

RecipeCard.defaultProps = {
  servings: undefined,
  date: undefined,
};

export default RecipeCard;
