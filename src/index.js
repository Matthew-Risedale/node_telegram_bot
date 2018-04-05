import React from "react";
import ReactDOM from "react-dom";
import { hot } from 'react-hot-loader';
import 'normalize.css'
import App from './js/components/App';

ReactDOM.render(<App/>, document.getElementById('app'));

export default hot(module)(App)