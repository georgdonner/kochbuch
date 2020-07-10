import React from 'react';
import PropTypes from 'prop-types';

import './Loading.scss';

const Loading = ({ message }) => (
  <div id="loader">
    <div className="lds-dual-ring" />
    {message ? (
      <div className="message">{message}</div>
    ) : null}
  </div>
);

Loading.propTypes = {
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: undefined,
};

export default Loading;
