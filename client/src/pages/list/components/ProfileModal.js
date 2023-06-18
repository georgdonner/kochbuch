import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const ListInput = ({
  profiles, show, onSelect, onClose,
}) => (
  <Modal
    isOpen={show}
    onRequestClose={onClose}
    contentLabel="Profil auswählen"
    style={{
      content: {
        maxWidth: '400px',
        margin: '0 auto',
        top: '5rem',
        textAlign: 'center',
      },
    }}
  >
    <h2 style={{ marginTop: 0 }}>Profil auswählen</h2>
    {(profiles || []).map((profile) => (
      <button
        type="button" key={profile._id} className="profile-button"
        onClick={() => onSelect(profile)}
      >
        {profile.name}
      </button>
    ))}
  </Modal>
);

ListInput.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

ListInput.defaultProps = {
  profiles: undefined,
};

export default ListInput;
