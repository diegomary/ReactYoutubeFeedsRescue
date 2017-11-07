import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

class ListComponent extends Component {

constructor(props) {
    super(props);
    this.state = { data: [], };
}

componentDidMount() {

fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw")
      .then(response => response.json())
      .then(json => {        
        this.setState({
          data: json.items
        });        
      });
}

componentWillMount() {}
componentWillUnmount() {}

shouldComponentUpdate(nextProps,nextState) {
  return true; 
}


componentWillReceiveProps(nextProps) {}
getInitialState() {}

render() {

  console.log(this.props);

  let feeds = this.state.data.map(function(item) {
      if (item.snippet.title === 'Deleted video')
      return (
            <h2 key = {item.id}>THE VIDEO DOESN'T EXIST ANYMORE</h2>
        );
      return (
        <section className="feed-container" key = {item.id}>
          <Link to={`/details/${item.id}/optionalParameter`}>
           <img alt="not found" src = {item.snippet.thumbnails.medium.url} className="feed-img"/>
         </Link>
          <div className="feed-text">
             <Link to={`/details/${item.id}/optionalParameter`}>
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