import React, { createContext, useState } from 'react';
     import * as api from '../services/api';

     export const AuthContext = createContext();

     export const AuthProvider = ({ children }) => {
       const [user, setUser] = useState(null);
       const [loading, setLoading] = useState(false);

       const login = async (username, password) => {
         setLoading(true);
         const userData = await api.login(username, password);
         setUser(userData);
         setLoading(false);
       };

       const logout = () => setUser(null);

       return (
         <AuthContext.Provider value={{ user, login, logout, loading }}>
           {children}
         </AuthContext.Provider>
       );
     };