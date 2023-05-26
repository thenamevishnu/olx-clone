import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseContext } from './Store/FirebaseContext';
import { db, auth, storage } from './Firebase/config';
import Context from './Store/FirebaseContext';

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <FirebaseContext.Provider value={{db, auth, storage}}>
        <Context>
            <App/>
        </Context>
    </FirebaseContext.Provider>
)