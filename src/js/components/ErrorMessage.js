'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  message: PropTypes.string.isRequired
};

const ErrorMessage = props => {
  return <span className="errorMassage">{props.message}</span>;
};

ErrorMessage.propTypes = propTypes;

export default ErrorMessage;
