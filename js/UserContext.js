import React, { useState } from 'react';
import { useContext } from "react";
import { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from "./AuthContext";

export const UserContext = React.createContext({
    userData: null,
    setUserData: () => {},
    userRole: null, 
    isLoading: true, 
});

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [userRole, setUserRole] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const authContext = useContext(AuthContext);
    const userToken = authContext.userToken;
    const userId = userToken ? userToken.sub : null;


    useEffect(() => {
        if (userId) {
            SecureStore.getItemAsync('jwt').then(token => {
                fetch('https://1c02-2600-1008-a111-a297-c1ef-aa97-3d94-7dd4.ngrok-free.app/user/' + userId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setUserData(data);
                    setIsLoading(false);

                    if (data.Role === 1) {
                        setUserRole('Standard');
                    } else if (data.Role === 2) {
                        setUserRole('Admin');
                    }
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    setIsLoading(false);
                });
            });
        } else {
            setIsLoading(false);
        }
    }, [userId]);

    return (
        <UserContext.Provider value={{ userData, setUserData, userRole, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};
