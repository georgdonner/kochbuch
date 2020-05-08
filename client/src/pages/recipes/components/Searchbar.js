import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';
import './Searchbar.scss';

const Searchbar = ({ onSearch, query }) => {
  const timeoutRef = useRef();

  return (
    <div id="searchbar">
      <div id="search-input">
        <Icon name="search" />
        <input
          type="search" name="search" placeholder="Suche nach Zutaten, Kategorien oder Titel..."
          onKeyUp={(({ key, target }) => {
            clearTimeout(timeoutRef.current);
            const { value } = target;
            if (key === 'Enter') {
              onSearch(value);
              target.blur();
            } else {
              timeoutRef.current = setTimeout(() => {
                onSearch(value);
                target.blur();
              }, 3000);
            }
          })}
          defaultValue={query}
        />
      </div>
    </div>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default Searchbar;
