/* eslint-disable jsx-a11y/no-autofocus */
import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import MainContext from '../../services/context';
import './Auth.scss';

export default () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser } = useContext(MainContext);

  const login = async () => {
    const data = await api
      .post('/login', {
        body: {
          email,
          password,
        },
      });

    if (data?.error?.message) {
      toast.error(`Fehler: ${data.error.message}`);
      setEmail('');
      setPassword('');
    } else if (data?.user) {
      updateUser(data.user);
      history.replace('/');
    }
  };

  return (
    <div className="fullscreen-container">
      <div className="auth-form">
        <input
          type="email" placeholder="Email" autoFocus required
          onChange={({ target }) => setEmail(target.value)}
          value={email}
        />
        <input
          type="password" placeholder="Passwort" required
          onChange={({ target }) => setPassword(target.value)}
          onKeyDown={({ key }) => {
            if (key === 'Enter') {
              login();
            }
          }}
          value={password}
        />
        <button className="button inverted" type="button" onClick={login}>Login</button>
        <p>
          Noch keinen Account?
          {' '}
          <Link to="/signup">Registrieren</Link>
        </p>
      </div>
    </div>
  );
};
