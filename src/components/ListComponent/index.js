import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

class ListComponent extends Component {

constructor(props) {
    super(props);
    this.state = { data: undefined, };
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

componentWillMount() {
  this.setState({ data: [], });
}



componentWillUnmount() {}
shouldComponentUpdate(nextProps,nextState) {  return true; }
componentWillReceiveProps(nextProps) {}

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
          <Link to = {`/details/${item.id}/pippala`}>
           <img alt="not found" src = {item.snippet.thumbnails.medium.url} className="feed-img"/>
         </Link>
          <div className="feed-text">
             <Link to = {`/details/${item.id}/maria`}>
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