/* eslint-disable jsx-a11y/no-autofocus */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import MainContext from '../../services/context';
import './Login.scss';

export default () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const { updateUser } = useContext(MainContext);

  const login = async () => {
    const res = await fetch('/api/password', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
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
    <div id="login-container">
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
