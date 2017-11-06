import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BeyondFeedsManagement from './BeyondFeedsManagement';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BeyondFeedsManagement />, document.getElementById('root'));
registerServiceWorker();