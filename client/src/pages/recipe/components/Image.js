import React from 'react';
import { recipe as recipePropType } from '../../../utils/propTypes';

const RecipeImage = ({ recipe }) => {
  const imgUrl = (width, highRes = false) => recipe.image.concat(`-/resize/${highRes ? width * 2 : width}x/`, `-/quality/${highRes ? 'lightest' : 'lighter'}/`, '-/progressive/yes/');

  const imgSource = (width, sizes = '100vw') => (
    <source
      media={`(min-width: ${width}px)`}
      srcSet={`${imgUrl(width)}, ${imgUrl(width, true)} 2x`}
      sizes={sizes}
    />
  );

  return (
    <picture>
      {imgSource(1000, '1000px')}
      {imgSource(800)}
      {imgSource(600)}
      {imgSource(400)}
      <img className="recipe-img" src={imgUrl(1000)} alt={recipe.title} />
    </picture>
  );
};

RecipeImage.propTypes = {
  recipe: recipePropType.isRequired,
};

export default RecipeImage;
