// src/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListComponent from './components/ListComponent/index';
import DetailsComponent from './components/DetailsComponent/index';
import NotFoundComponent from './components/NotFoundComponent/index';

class Routes extends Component {
	constructor(props) {
    	super(props);
    	this.state = { routeState: undefined, };   
	}
	render() {
		return(
			<Router>					 
				<Switch>
				    <Route exact path = "/" component = { ListComponent } />
				    {/*<Route exact path="/details/:id/:optionalparam?" component = { DetailsComponent } newparam='Test parameter'/>*/}				
				    <Route exact path="/details/:id/:optionalparam?" render={(props) => <DetailsComponent {...props} newparam='Test parameter'/>}/>
				    <Route component  = { NotFoundComponent } />
				</Switch>   				
  			</Router>
		);
	}
}
export default Routes;


