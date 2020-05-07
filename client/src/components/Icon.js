import React from 'react';
import PropTypes from 'prop-types';
import './Icon.scss';

export const iconList = {
  add: 'icon-add',
  addCart: 'icon-add_shopping_cart',
  arrowLeft: 'icon-arrow-left2',
  cart: 'icon-shopping_cart',
  edit: 'icon-create',
  keepAwake: 'icon-wb_sunny',
  menu: 'icon-menu',
  search: 'icon-search',
  share: 'icon-share',
};

const Icon = ({ name, color, rotate }) => {
  const style = {};
  if (color) style.color = color;
  if (rotate) style.transform = `rotate(${rotate}deg)`;
  return (
    <span
      className={`icon ${iconList[name]}`}
      style={style}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(iconList)).isRequired,
  color: PropTypes.string,
  rotate: PropTypes.number,
};

Icon.defaultProps = {
  color: null,
  rotate: 0,
};

export default Icon;
