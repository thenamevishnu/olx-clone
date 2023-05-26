import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from "./Pages/Login"
import { authContext } from './Store/FirebaseContext';
import { auth } from './Firebase/config';
import Create from "./Pages/Create"
import View from './Pages/ViewPost'
import Post from './Store/PostContext';

function App() {

  const { setUser } = useContext(authContext)

  useEffect(()=>{
      auth.onAuthStateChanged(firebaseUser=>{
          setUser(firebaseUser)
      })
  },[setUser])

  return (
    <div>
      <Post>
        <Router>
              <Routes>
                  <Route Component={Home} exact path="/"/>
                  <Route Component={Signup} path="/signup"/>
                  <Route Component={Login} path="/login"/>
                  <Route Component={Create} path='/create'/>
                  <Route Component={View} path='/view'/>
              </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
