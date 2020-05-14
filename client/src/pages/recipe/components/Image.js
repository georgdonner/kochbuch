import React from 'react';
import { recipe as recipePropType } from '../../../utils/propTypes';

const RecipeImage = ({ recipe }) => {
  const imgUrl = (width) => recipe.image.replace(/\d+.jpg/, `${width}.jpg`);

  const imgSource = (width, sizes = '100vw') => (
    <source
      media={`(min-width: ${width}px)`}
      srcSet={`${imgUrl(width)}, ${imgUrl(width * 2)} 2x`}
      sizes={sizes}
    />
  );

  return (
    <picture>
      {imgSource(1000, '1000px')}
      {imgSource(800)}
      {imgSource(400)}
      <img crossOrigin="anonymous" className="recipe-img" src={imgUrl(1000)} alt={recipe.title} />
    </picture>
  );
};

RecipeImage.propTypes = {
  recipe: recipePropType.isRequired,
};

export default RecipeImage;
