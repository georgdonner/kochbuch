import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '@clerk/clerk-react';

import MainContext from '../../../services/context';
import api from '../../../services/api';

const NoList = ({ onUpdate }) => {
  const [code, setCode] = useState('');
  const { user } = useUser();

  const updateCode = async () => {
    await api.post('/user', {
      body: {
        listCode: code,
      },
    });
    user.reload();
    onUpdate(code.trim());
  };

  return (
    <div id="nocode-wrapper">
      <div id="nocode">
        <label htmlFor="code">
          Um die Einkaufsliste nutzen zu können, gib hier bitte einen Code ein.
          Dieser Code wird verwendet, um deine Einkaufsliste eindeutig zu identifizieren,
          daher such dir am besten einen einzigartigen und ausgefallenen Code aus.
          <br />
          Falls du die gleiche Liste auf einem anderen Gerät verwenden
          oder mit jemandem zusammen benutzen möchtest, einfach dort den gleichen Code eingeben
          und die Liste synchronisiert sich automatisch!
        </label>
        <input
          type="text" name="code" placeholder="Einkaufslisten Code"
          value={code} className="input"
          onChange={({ target }) => setCode(target.value)}
          onKeyDown={({ key }) => {
            if (key === 'Enter' && code.trim()) {
              updateCode();
            }
          }}
        />
        <button className="button inverted" type="button" onClick={updateCode}>
          Bestätigen
        </button>
      </div>
    </div>
  );
};

NoList.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default NoList;
