// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ListComponent from './components/ListComponent/index';
import DetailsComponent from './components/DetailsComponent/index';
import AboutComponent from './components/AboutComponent/index';
import NotFoundComponent from './components/NotFoundComponent/index';

const Routes = () => (
  <Router>
	<div>
	    <p><Link to="/">List</Link></p>
	    <p><Link to="/details">Details</Link></p>
	    <p><Link to="/about">About</Link></p>	  
	    <hr/> 
		<Switch>
		    <Route exact path = "/" component = { ListComponent } />
		    <Route exact path = "/details" component = { DetailsComponent } />
		    <Route exact path = "/about" component = { AboutComponent } />
		    <Route exact path="/details/:id/:optionalparam?" component = { DetailsComponent }/>
		    <Route component  = { NotFoundComponent } />
		</Switch>  
   </div> 
  </Router>
);

export default Routes;