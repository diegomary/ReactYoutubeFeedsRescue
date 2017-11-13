import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';

class ListComponent extends Component {

constructor(props) {
    super(props);
    this.state = { data: undefined, };
    this.detailsData = {};
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
     
      this.detailsData = {pathname: `/details/${encodeURIComponent(item.id.replace(/'?'/g, '%3F'))}`,itemData:item };
      if (item.snippet.title === 'Deleted video')
      return (
            <h2 key = {item.id}>THE VIDEO DOESN'T EXIST ANYMORE</h2>
        );
      return (       
        <section className={styles.feedcontainer} key = {item.id}>

        <Link to = {this.detailsData}>
         {/* <Link to = {`/details/${encodeURIComponent(item.id.replace(/'?'/g, '%3F'))}/secondoptional`}>*/}
           <img alt="not found" src = {item.snippet.thumbnails.medium.url} className={styles.feedimg}/>
         </Link>
          <div className={styles.feedtext}>
           <Link to = {this.detailsData}>
            {/* <Link to = {`/details/${encodeURIComponent(item.id.replace(/'?'/g, '%3F'))}/secondoptional`}>*/}
              <h2 className={styles.feedtitle}>{item.snippet.title}</h2>
            </Link>
            <p className={styles.feeddate}>Published on {item.snippet.publishedAt}</p>
            <p className={styles.feeddescription}> {item.snippet.description}</p>          
          </div>
        </section>
        ); 
  });

  return (    
    <div className={styles.App}>   
      {feeds}    
    </div>
  );
}
}

export default ListComponent;