import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import MainContext from '../../services/context';
import api from '../../services/api';
import './Settings.scss';
import Nav from '../../components/Nav';

export default () => {
  const history = useHistory();
  const { user, updateUser } = useContext(MainContext);
  const { planCode = '', listCode = '' } = user;
  const [codes, setCodes] = useState({ planCode, listCode });
  const [diet, setDiet] = useState(window.localStorage.getItem('diet') || 'alles');

  const save = async () => {
    const updatedUser = await api.post('/user', {
      body: codes,
    });
    updateUser({
      listCode: updatedUser.listCode,
      planCode: updatedUser.planCode,
    });
    toast.success('Einstellungen gespeichert');
    history.push('/');
  };

  return (
    <>
      <Nav page="recipes" />
      <div id="settings">
        <h2>Einstellungen</h2>
        <div>
          <label>Ernährung</label>
          <select
            value={diet}
            onChange={({ target }) => {
              setDiet(target.value);
              if (target.value === 'alles') {
                window.localStorage.removeItem('diet');
              } else {
                window.localStorage.setItem('diet', target.value);
              }
            }}
          >
            <option value="alles">Alles</option>
            <option value="vegetarisch">Vegetarisch</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>
        <div>
          <label>Einkaufslisten Code</label>
          <input
            type="text" value={codes.listCode}
            onChange={({ target }) => {
              setCodes({ ...codes, listCode: target.value });
            }}
          />
          <label>Wochenplan Code</label>
          <input
            type="text" value={codes.planCode}
            onChange={({ target }) => {
              setCodes({ ...codes, planCode: target.value });
            }}
          />
          <button className="button inverted" type="button" onClick={save}>Speichern</button>
        </div>
      </div>
    </>
  );
};
