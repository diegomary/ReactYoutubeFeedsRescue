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
      return (<p key = {item.kind}><span>{item.snippet.title}</span>&nbsp;
        <textarea defaultValue={item.snippet.description} rows="10" cols="20"></textarea>     
        </p>);
  });


  return (
    <div className="App">   
      {feeds}    
    </div>
  );

}
}


export default BeyondFeedsManagement;