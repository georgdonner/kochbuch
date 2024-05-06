import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import MainContext from '../../services/context';

export default () => {
  const { user, updateUser } = useContext(MainContext);
  const history = useHistory();

  if (!user?.email) {
    return (
      <Redirect to="/login" />
    );
  }

  const logout = () => {
    updateUser(null);
    history.replace('/logout');
  };

  return (
    <div>
      {user.email}
      <button className="button inverted" type="button" onClick={logout}>Logout</button>
    </div>
  );
};
