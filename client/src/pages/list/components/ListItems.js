import React from 'react';
import PropTypes from 'prop-types';
import { ReactSortable } from 'react-sortablejs';

import ListItem from './ListItem';

const groupByCategory = (list) => {
  const grouped = new Map();
  list.forEach((item) => {
    const categoryId = item.category?._id;
    const category = grouped.get(categoryId);
    if (category) {
      category.items.push(item);
    } else {
      grouped.set(categoryId, { ...item.category || {}, items: [item] });
    }
  });
  return Array.from(grouped.values());
};

const ListItems = ({
  items, isSorted, onEdit, onSort, onRemove, onRemoveAll,
}) => (
  <div id="list-container">
    {isSorted ? (
      <div id="list">
        {groupByCategory(items)
          .map((category) => (
            <div key={category._id || 'none'} className="ctg-wrapper">
              <div className="ctg-label">{category.name || 'Unsortiert'}</div>
              {category.items.map((item) => (
                <ListItem
                  key={item.id}
                  name={item.name}
                  onEdit={() => onEdit(item)}
                  onRemove={() => onRemove(item.id)}
                />
              ))}
            </div>
          ))}
      </div>
    ) : (
      <ReactSortable
        list={items} id="list"
        setList={() => {}} delay={250}
        onUpdate={onSort}
      >
        {items.map((item) => (
          <ListItem
            key={item.id}
            name={item.name}
            onEdit={() => onEdit(item)}
            onRemove={() => onRemove(item.id)}
          />
        ))}
      </ReactSortable>
    )}
    {items.length > 5 ? (
      <div style={{ textAlign: 'center' }}>
        <button
          className="button" id="remove-all" type="button"
          onClick={onRemoveAll}
        >
          Alle entfernen
        </button>
      </div>
    ) : null}
  </div>
);

ListItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
  isSorted: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRemoveAll: PropTypes.func.isRequired,
};

export default ListItems;
