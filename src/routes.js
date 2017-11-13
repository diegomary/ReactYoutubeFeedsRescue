// src/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListComponent from './components/ListComponent/index';
import DetailsComponent from './components/DetailsComponent/index';
import NotFoundComponent from './components/NotFoundComponent/index';

class Routes extends Component {

	constructor(props) {
    	super(props);
    	this.state = {data:[],};    	
	}


	componentDidMount() {

	fetch("https://apimicrobach.azurewebsites.net/youtube",{ 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Basic ' + btoa('diego:secret')}
      })
      .then(response =>{
      if (response.status >= 400) { return 'error'; }
      return response.json() })
      .then(json => {           
        this.setState({          
          data: ( json === 'error' ? 'error' : json.items )
        });
      });
}


	dataSupplier = () => { return this.state.data; }

	render() {

	if(this.state.data.length === 0) return(null);


	if (this.state.data === 'error')
	    return (
	    <div className="App">   
	      <h2>An error prevented to read the feeds properly</h2>  
	    </div>
	  );

	return(
		<Router>					 
			<Switch>
			    <Route exact path = "/" render={(props) => <ListComponent {...props} youtubeFeeds={this.dataSupplier}/>}/>
			    {/*<Route exact path="/details/:id/:optionalparam?" component = { DetailsComponent } newparam='Test parameter'/>*/}				
			    <Route exact path="/details/:id/:optionalparam?" render={(props) => <DetailsComponent {...props} otherparam="testparameter"/>}/>
			    <Route component  = { NotFoundComponent } />
			</Switch>   				
			</Router>
		);
	}
}
export default Routes;


