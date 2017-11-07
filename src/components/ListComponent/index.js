import React, { Component } from 'react';
import './styles.css';

class BeyondFeedsManagement extends Component {

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

  let feeds = this.state.data.map(function(item) {
      if (item.snippet.title === 'Deleted video') return;

     return (
      <section className="feed-container" key = {item.kind}>
        <a href ="#">
          <img src = {item.snippet.thumbnails.medium.url} className="feed-img"/>
        </a>
        <div className="feed-text">
          <a href="#">
            <h2 className="feed-title">{item.snippet.title}</h2>
          </a>
          <p className="feed-date">Published on {item.snippet.publishedAt}</p>
          <p className="feed-description"> {item.snippet.description}</p>          
        </div>
      </section>); 
  });


  return (
    <div className="App">   
      {feeds}    
    </div>
  );

}
}


export default BeyondFeedsManagement;