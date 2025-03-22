import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulasi fungsi resetPassword
  const resetPassword = async (email) => {
    console.log(`Password reset link sent to ${email}`);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;