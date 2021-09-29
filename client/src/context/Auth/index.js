/* eslint-disable max-len, no-console */
/*
 * Package Import
 */
import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

/*
 * Local Import
 */

/*
 * Code
 */
const AuthContext = createContext();

/*
 * Auth
 */
const Auth = ({ children }) => {
  /*
   * State
   */
  const [userId, setUserId] = useState('');

  /**
   * setUser •
   * @param  {Object}
   */
  const setUser = (user) => {
    setUserId(user.id)
  };

  const value = {
    setUser,
    userId,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

/*
 * Export
 */
export { Auth, AuthContext };
