import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { ReactSortable } from 'react-sortablejs';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import Icon from '../../../components/Icon';
import './ListProfiles.scss';

Modal.setAppElement('#root');

const convertToSortable = (categories) => categories.map(
  (category) => ({ id: category._id, category }),
);
const ListProfiles = ({ profiles, updateList }) => {
  const [editProfile, setProfile] = useState(null);
  const [availableCategories, setAvailableCategories] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetched = await api.get('/list/profile/categories');
      setAvailableCategories(fetched);
    };
    fetchCategories();
  }, []);

  return availableCategories ? (
    <div className="list-profiles">
      <label>Einkaufslisten Profile</label>
      {profiles ? (
        profiles.map((profile) => (
          <div key={profile._id} className="profile">
            {profile.name}
            <button
              type="button"
              onClick={() => {
                setProfile(profile);
                setCategories(convertToSortable(profile.orderedCategories));
              }}
            >
              <Icon name="edit" />
            </button>
            <button
              type="button"
              onClick={async () => {
                const list = await api.delete(`/list/profile/${profile._id}`);
                await updateList(list);
                toast.success('Profil gelöscht');
              }}
            >
              <span className="delete-profile">x</span>
            </button>
          </div>
        ))
      ) : null}
      <button
        type="button" className="button"
        onClick={() => {
          setProfile({ name: '', orderedCategories: availableCategories });
          setCategories(convertToSortable(availableCategories));
        }}
      >
        Profil hinzufügen
      </button>
      <Modal
        isOpen={Boolean(editProfile)}
        onRequestClose={() => setProfile(null)}
        contentLabel={editProfile && editProfile._id ? 'Profil bearbeiten' : 'Neues Profil'}
        style={{
          content: {
            top: '5rem',
            maxWidth: '500px',
            margin: '0 auto',
          },
        }}
      >
        {editProfile ? (
          <>
            <h1 style={{ marginTop: 0 }}>{editProfile._id ? 'Profil bearbeiten' : 'Neues Profil'}</h1>
            <input
              className="modal-input"
              type="text" value={editProfile.name} placeholder="Name des Profils"
              onChange={(e) => setProfile({ ...editProfile, name: e.target.value })}
            />
            <h3>Reihenfolge anpassen</h3>
            <ReactSortable
              list={categories} id="profile-categories"
              setList={setCategories} delay={250} delayOnTouchOnly
            >
              {categories.map(({ id, category }, index) => (
                <div key={id} className="profile-category">
                  {index + 1}
                  .
                  {' '}
                  {category.name}
                </div>
              ))}
            </ReactSortable>
            <button
              style={{ marginBottom: '1rem' }}
              type="button" className="button inverted"
              onClick={async () => {
                const list = await api.put('/list/profile', {
                  body: {
                    ...editProfile,
                    orderedCategories: categories.map(({ id }) => id),
                  },
                });
                await updateList(list);
                toast.success('Profil gespeichert');
                setProfile(null);
              }}
            >
              Speichern
            </button>
          </>
        ) : null}
      </Modal>
    </div>
  ) : (
    <div>Konnte Kategorien nicht laden</div>
  );
};

export default ListProfiles;

ListProfiles.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orderedCategories: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  })),
  updateList: PropTypes.func.isRequired,
};

ListProfiles.defaultProps = {
  profiles: undefined,
};
