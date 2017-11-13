import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class ListComponent extends Component {

constructor(props) {
    super(props);
    this.state = { data: undefined, };
}


componentDidMount() {
   this.setState({data: this.props.youtubeFeeds()});
 }

componentWillMount() {
  this.setState({ data: [], });
}


componentWillUnmount() {}
shouldComponentUpdate(nextProps,nextState) {  return true; }
componentWillReceiveProps(nextProps) {}

render() { 


  let feeds = this.state.data.map((item)=> {
     
      const obj = {pathname: `/details/${encodeURIComponent(item.id.replace(/'?'/g, '%3F'))}`,it:item };
      localStorage.setItem(item.id, JSON.stringify(item));


      if (item.snippet.title === 'Deleted video')
      return (
            <h2 key = {item.id}>THE VIDEO DOESN'T EXIST ANYMORE</h2>
        );
      return (       
        <section className="feed-container" key = {item.id}>
          <Link to = {`/details/${encodeURIComponent(item.id.replace(/'?'/g, '%3F'))}/secondoptional`}>
           <img alt="not found" src = {item.snippet.thumbnails.medium.url} className="feed-img"/>
         </Link>
          <div className="feed-text">
             <Link to = {`/details/${encodeURIComponent(item.id.replace(/'?'/g, '%3F'))}/secondoptional`}>
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