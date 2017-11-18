// src/routes.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListComponent from './components/ListComponent/index';
import DetailsComponent from './components/DetailsComponent/index';
import NotFoundComponent from './components/NotFoundComponent/index';

class Routes extends Component {

	constructor(props) {
    	super(props);
    	this.state = {data:[],ready:false}; 
    	this.defaultSearch = null;

	}

	componentWillMount() {}
	componentDidMount() {}


	setFavourite = () => {

	if(this.refs.favouriteFeed.value) {
  		this.defaultSearch = this.refs.favouriteFeed.value;
  		this.searchFeeds(this.defaultSearch)
	      .then(response =>{
	      if (response.status >= 400) { return 'error'; }
	      return response.json() })
	      .then(json => {           
	        this.setState({          
	          data: ( json === 'error' ? 'error' : json.items ),ready:true
	        });
	      });
  	}}


	dataSupplier = () => { return this.state.data; };
	searchFeeds = (criteria) => {
		let mainUrl = "https://www.googleapis.com/youtube/v3/search";
		let qsData = {
			q:criteria,
	      	maxResults: '50',
	      	part: 'snippet',
	      	// DMM web site restricted key	      		      	
	      	key:'AIzaSyCpUAns1B-pRnPcL8EH7WmuOq5pIBrKCi8'	      	
	      	};	  	 
		let esc = encodeURIComponent;
	    let query = `?${Object.keys(qsData).map(k => `${esc(k)}=${esc(qsData[k])}`).join('&')}`;
		return fetch(mainUrl.concat(query), {method: 'GET'});	      }


	render() {
	
	if (this.state.data === 'error')
	    return (
	    <div className="App">   
	      <h2>An error prevented to read the feeds properly</h2>  
	    </div>
	);

	
	if(this.state.ready)
	{
		return(		
			<Router>					 
				<Switch>				
				    <Route exact path = "/build/" render={(props) => <ListComponent {...props} defaultSearch={this.defaultSearch} foundFeeds = {this.searchFeeds} youtubeFeeds={this.dataSupplier}/>}/>
				    {/*<Route exact path="/details/:id/:optionalparam?" component = { DetailsComponent } newparam='Test parameter'/>*/}				
				    <Route exact path="/build/details/:id/:optionalparam?" render={(props) => <DetailsComponent {...props} otherparam="testparameter"/>}/>
				    <Route component  = { NotFoundComponent } />
				</Switch>   				
			</Router>
		);
	}
		return(
			<div>
				Default feed:<input type= "text" ref="favouriteFeed"/> 
	      		<button onClick={this.setFavourite}>Set</button>
    		</div>
		)

	}
}
export default Routes;


