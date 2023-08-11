import React, { useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from "./AuthContext";

export const TaskContext = React.createContext({
    tasks: [],
    setTasks: () => {},
    isLoading: true,
    setCurrentTeamId: () => {},
});

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);  
    const [currentTeamId, setCurrentTeamId] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const authContext = useContext(AuthContext);
    const userToken = authContext.userToken;

    useEffect(() => {
        if (currentTeamId) {
            setIsLoading(true);
            SecureStore.getItemAsync('jwt').then(token => {
                fetch('https://44b3-2600-1008-a111-a297-9d26-68f5-40e6-29bd.ngrok-free.app/team/' + currentTeamId + '/tasks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setTasks(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    setIsLoading(false);
                });
            });
        } else {
            setTasks([]);
            setIsLoading(false);
        }
    }, [currentTeamId]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks, isLoading, setCurrentTeamId }}>
            {children}
        </TaskContext.Provider>
    );
};
