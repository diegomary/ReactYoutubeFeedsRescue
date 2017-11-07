// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import BeyondFeedsManagement from './components/ListComponent/index';
import About from './components/AboutComponent/index';
import NotFound from './components/NotFoundComponent/index';

const Routes = (props) => (
  <Router>
	<div>
	    <p><Link to="/">Home</Link></p>
	    <p><Link to="/about">About</Link></p>	  
	    <hr/> 
		<Switch>
		    <Route exact path= "/" component = {BeyondFeedsManagement} />
		    <Route exact path= "/about" component = {About} />
		    <Route component = {NotFound} />
		</Switch>  
   </div> 
  </Router>
);

export default Routes;