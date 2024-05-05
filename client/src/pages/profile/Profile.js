import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import MainContext from '../../services/context';

export default () => {
  const { user } = useContext(MainContext);

  console.log(user);

  if (!user) {
    return (
      <Redirect to="/login" />
    );
  }

  return (
    <div>
      {user.username}
    </div>
  );
};
