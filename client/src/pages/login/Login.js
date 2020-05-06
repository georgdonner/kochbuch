/* eslint-disable jsx-a11y/no-autofocus */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import MainContext from '../../services/context';
import './Login.scss';

export default () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const { updateUser } = useContext(MainContext);

  const login = async () => {
    const res = await api.post('/password', {
      body: { password },
      fullResponse: true,
    });
    if (res.ok) {
      updateUser({ authenticated: true });
      history.replace('/');
      toast.success('Login erfolgreich!');
    } else if (res.status === 401) {
      toast.error('Falsches Passwort!');
      setPassword('');
    } else {
      const { error } = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <div className="fullscreen-container">
      <div id="login">
        <input
          type="text" placeholder="Passwort" autoFocus
          onChange={({ target }) => setPassword(target.value)}
          onKeyDown={({ key }) => {
            if (key === 'Enter') {
              login();
            }
          }}
          value={password}
        />
        <button className="button inverted" type="button" onClick={login}>Login</button>
      </div>
    </div>
  );
};
