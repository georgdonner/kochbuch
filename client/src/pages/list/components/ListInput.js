import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const ListInput = ({
  categories, editItem, isSorted, onUpdate, onAdd,
}) => {
  const [newItem, setNewItem] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (editItem) {
      setNewItem(editItem.name);
      inputRef.current.focus();
    }
  }, [editItem]);

  return (
    <div id="new-item-wrapper" className={editItem ? 'sticky' : ''}>
      <div id="new-item">
        <input
          ref={inputRef}
          value={newItem} type="text" placeholder="Hinzufügen"
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={({ key }) => {
            if (key === 'Enter') {
              if (editItem) {
                onUpdate({
                  category: editItem.category,
                  name: newItem,
                });
              } else {
                onAdd(newItem);
              }
              setNewItem('');
            }
          }}
          enterkeyhint="done"
        />
        {categories && editItem && isSorted ? (
          <div className="select">
            <label htmlFor="select-category">Kategorie</label>
            <select
              id="select-category"
              value={editItem.category?._id || 'none'}
              onChange={(e) => {
                onUpdate({
                  category: e.target.value,
                  name: newItem,
                });
                setNewItem('');
              }}
            >
              {!editItem.category ? <option key="none" value="none">Kategorie auswählen</option> : null}
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
        ) : null}
      </div>
    </div>
  );
};

ListInput.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  editItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  isSorted: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

ListInput.defaultProps = {
  editItem: undefined,
};

export default ListInput;
