import React from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import styles from './App.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from '../Main';
import Users from '../Users';


const App = () => (
    <Router>
        <div>
        <Route
            path="/users"
            component={() => (
            <Users />
            )}
        />
        <Route
            exact path="/"
            component={() => (
            <Main />
            )}
        />
        </div>
    </Router>

)

export default App;
