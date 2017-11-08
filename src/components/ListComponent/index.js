import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

class ListComponent extends Component {

constructor(props) {
    super(props);
    this.state = { data: [], };
}

componentDidMount() {

fetch("https://apimicrobach.azurewebsites.net/youtube",
      { method: 'GET',headers: {'Accept': 'application/json','Content-Type': 'application/json',}})
      .then(response =>{
      if (response.status >= 400) { return 'error'; }
      return response.json() })
      .then(json => {           
        this.setState({          
          data: ( json === 'error' ? 'error' : json.items )
        });        
      });
}

componentWillMount() {}
componentWillUnmount() {}
shouldComponentUpdate(nextProps,nextState) {  return true; }
componentWillReceiveProps(nextProps) {}
getInitialState() {}

render() { 

  if (this.state.data === 'error')
    return (
    <div className="App">   
      <h2>An error prevented to read the feeds properly</h2>  
    </div>
  );


  let feeds = this.state.data.map(function(item) {
      if (item.snippet.title === 'Deleted video')
      return (
            <h2 key = {item.id}>THE VIDEO DOESN'T EXIST ANYMORE</h2>
        );
      return (       
        <section className="feed-container" key = {item.id}>
          <Link to = {`/details/${item.id}/optionalParameter`}>
           <img alt="not found" src = {item.snippet.thumbnails.medium.url} className="feed-img"/>
         </Link>
          <div className="feed-text">
             <Link to = {`/details/${item.id}/optionalParameter`}>
              <h2 className="feed-title">{item.snippet.title}</h2>
            </Link>
            <p className="feed-date">Published on {item.snippet.publishedAt}</p>
            <p className="feed-description"> {item.snippet.description}</p>          
          </div>
        </section>
        ); 
  });


  return (
    <div className="App">   
      {feeds}    
    </div>
  );

}
}


export default ListComponent;