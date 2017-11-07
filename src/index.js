import React from 'react';
import ReactDOM from 'react-dom';
//mport createHistory   from 'history/createBrowserHistory';

import Routes from './routes';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes/>,document.getElementById('root'));

registerServiceWorker();
