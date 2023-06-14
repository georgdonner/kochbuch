import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';

const ListNav = ({ name, onRemove, onEdit }) => (
  <div className="item-wrapper">
    <label className="input-container">
      <input type="checkbox" />
      <span
        className="checkmark box"
        onClick={onRemove}
      />
      <span className="item">
        <span>{name}</span>
        <button
          type="button"
          onClick={onEdit}
        >
          <Icon name="edit" />
        </button>
      </span>
    </label>
  </div>
);

ListNav.propTypes = {
  name: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ListNav;
