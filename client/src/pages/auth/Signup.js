/* eslint-disable jsx-a11y/no-autofocus */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import MainContext from '../../services/context';
import './Auth.scss';

export default () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser } = useContext(MainContext);

  const signup = async () => {
    const data = await api
      .post('/signup', {
        body: {
          username,
          email,
          password,
        },
      });

    if (data?.error?.message) {
      toast.error(`Fehler: ${data.error.message}`);
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
          type="text" placeholder="Username" required
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
        <input
          type="email" placeholder="Email" autoFocus required
          onChange={({ target }) => setEmail(target.value)}
          value={email}
        />
        <input
          type="password" placeholder="Passwort" required
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
        <button className="button inverted" type="button" onClick={signup}>Registrieren</button>
      </div>
    </div>
  );
};
