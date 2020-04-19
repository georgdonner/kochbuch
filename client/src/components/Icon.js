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

const Icon = (props) => (
  <span
    className={`icon ${iconList[props.name]}`}
    style={{ color: props.color }}
  />
);

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(iconList)).isRequired,
  color: PropTypes.string,
};

Icon.defaultProps = {
  color: null,
};

export default Icon;
