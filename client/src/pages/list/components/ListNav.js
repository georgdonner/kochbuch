import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Nav, { NavButton } from '../../../components/Nav';

const ListNav = ({ onSort }) => {
  const [wakelock, setWakelock] = useState();

  return (
    <Nav page="list">
      <NavButton
        icon="sort"
        onClick={onSort}
      />
      {'wakeLock' in navigator && (
        <NavButton
          icon="keepAwake"
          onClick={async () => {
            try {
              if (wakelock) {
                await wakelock.release();
                setWakelock(null);
                toast.info('Einkaufsmodus deaktiviert - Display kann sich wieder automatisch ausschalten');
              } else {
                const lock = await navigator.wakeLock.request('screen');
                setWakelock(lock);
                toast.info('Einkaufsmodus aktiviert - Display schaltet sich nicht automatisch aus');
              }
            } catch (error) {
              toast.error(`Konnte Einkaufsmodus nicht aktivieren: ${error.message}`);
            }
          }}
          hasActiveState
        />
      )}
    </Nav>
  );
};

ListNav.propTypes = {
  onSort: PropTypes.func.isRequired,
};

export default ListNav;
