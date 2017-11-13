import React, {Component } from 'react';
import styles from './styles.css';

class DetailsComponent extends Component {
constructor(props) {
    super(props);
    this.state = { data: undefined, };
    this.item = {};   
}
componentWillMount() {

  this.setState({ data: this.props.location.itemData,});
  if(typeof this.props.location.itemData !== 'undefined')
  {localStorage.setItem(this.props.match.params.id, JSON.stringify(this.props.location.itemData));}
}

componentWillUnmount()
{  
  localStorage.clear();
}

  render() {

    this.item = this.state.data;
    if(typeof this.item === 'undefined') 
    {     
      this.item = JSON.parse(localStorage.getItem(this.props.match.params.id));
    }

    return (
      <div className = {styles.feedcontainer}>
     <h1 className={styles.feedtitle}>{this.item.snippet.title}</h1>
     <div className={styles.videocontainer}>
       <div className={styles.videowrapper}>
         <iframe src={"https://www.youtube.com/embed/" + this.item.contentDetails.upload.videoId}></iframe>
       </div>
     </div>
     <div className={styles.feedtext}>
     <p className={styles.feeddate}>{this.item.snippet.publishedAt}</p>
     <p className={styles.feeddescription}>{this.item.snippet.description}</p>
     </div>
     </div>
    );
  }
}
export default  DetailsComponent