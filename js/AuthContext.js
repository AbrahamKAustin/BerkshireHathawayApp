import React from 'react';

export const AuthContext = React.createContext({
    userToken: null,
    signIn: async () => {},
    signOut: async () => {},
    isLoading: true, // Add isLoading to the context
  });
