import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Nav, { NavButton } from '../../../components/Nav';
import Icon from '../../../components/Icon';

const RecipeNav = ({ onBack, recipeTitle }) => {
  const [wakelock, setWakelock] = useState();

  return (
    <Nav
      page="recipes"
      menuButton={(
        <button type="button" className="menu-button" onClick={onBack}>
          <Icon name="arrowLeft" color="#333" />
        </button>
      )}
    >
      {navigator.share ? (
        <NavButton
          icon="share"
          onClick={() => {
            navigator.share({
              url: window.location.href,
              title: recipeTitle,
              text: recipeTitle,
            });
          }}
        />
      ) : null}
      {'wakeLock' in navigator && (
        <NavButton
          icon="keepAwake"
          onClick={async () => {
            try {
              if (wakelock) {
                await wakelock.release();
                setWakelock(null);
                toast.info('Kochmodus deaktiviert - Display kann sich wieder automatisch ausschalten');
              } else {
                const lock = await navigator.wakeLock.request('screen');
                setWakelock(lock);
                toast.info('Kochmodus aktiviert - Display schaltet sich nicht automatisch aus');
              }
            } catch (error) {
              toast.error(`Konnte Kochmodus nicht aktivieren: ${error.message}`);
            }
          }}
          hasActiveState
        />
      )}
    </Nav>
  );
};

RecipeNav.propTypes = {
  onBack: PropTypes.func.isRequired,
  recipeTitle: PropTypes.string.isRequired,
};

export default RecipeNav;
