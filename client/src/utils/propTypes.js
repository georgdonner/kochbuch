import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const recipe = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  servings: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    hint: PropTypes.string,
  })),
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
});
