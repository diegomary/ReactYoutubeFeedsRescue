import React, {Component } from 'react';
import Routes from './routes';
//import classnames from 'classnames';
import './index.css';
export default class Init extends Component {

	constructor(props) {
    super(props);
    this.defaultSearch = null;
    this.state = {
    	ready: false
    }
  }

  setFavourite = () => {

  	if(this.refs.favouriteFeed.value) {
  		this.defaultSearch = this.refs.favouriteFeed.value;
  		this.setState({
  			ready: true
  		});
  	}

  }

  render() {
	if(this.state.ready) {
    	return (
      		<div>         		  
          		<Routes defaultSearch = {this.defaultSearch}/>      
      		</div>
    	);
    }
    return(
    	<div>
			Default feed:<input type= "text" ref="favouriteFeed"/> 
      		<button onClick={this.setFavourite}>Set</button>
    	</div>
    );
  }
}