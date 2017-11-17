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
		let mainUrl = "https://www.googleapis.com/youtube/v3/search";
		let qsData = {
			q:'right hand speed classic guitar',
	      	maxResults: '50',
	      	part: 'snippet',
	      	// DMM web site restricted key	      		      	
	      	key:'AIzaSyCpUAns1B-pRnPcL8EH7WmuOq5pIBrKCi8'
	      	

	  	}; 
		let esc = encodeURIComponent;
	    let query = `?${Object.keys(qsData).map(k => `${esc(k)}=${esc(qsData[k])}`).join('&')}`;

		fetch(mainUrl.concat(query),{ 
	      method: 'GET'            
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
				
			    <Route exact path = "/build/" render={(props) => <ListComponent {...props} youtubeFeeds={this.dataSupplier}/>}/>
			    {/*<Route exact path="/details/:id/:optionalparam?" component = { DetailsComponent } newparam='Test parameter'/>*/}				
			    <Route exact path="/build/details/:id/:optionalparam?" render={(props) => <DetailsComponent {...props} otherparam="testparameter"/>}/>
			    <Route component  = { NotFoundComponent } />
			</Switch>   				
			</Router>
		);
	}
}
export default Routes;


