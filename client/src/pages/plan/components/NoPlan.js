import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NoPlan = ({ onUpdate }) => {
  const [code, setCode] = useState('');

  const updateCode = () => {
    onUpdate(code);
  };

  return (
    <div id="nocode-wrapper">
      <div id="nocode">
        <label htmlFor="code">
          Um den Wochenplan nutzen zu können, gib hier bitte einen Code ein.
          Dieser Code wird verwendet, um deinen Wochenplan eindeutig zu
          identifizieren, daher such dir am besten einen einzigartigen und ausgefallenen Code aus.
          <br />
          Falls du den gleichen Wochenplan auf einem anderen Gerät
          verwenden oder mit jemandem zusammen benutzen möchtest,
          einfach dort den gleichen Code eingeben und der Plan synchronisiert sich automatisch!
        </label>
        <input
          type="text" name="code" placeholder="Wochenplan Code"
          value={code} className="input"
          onChange={({ target }) => setCode(target.value)}
          onKeyDown={({ key }) => {
            if (key === 'Enter') {
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

NoPlan.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default NoPlan;
