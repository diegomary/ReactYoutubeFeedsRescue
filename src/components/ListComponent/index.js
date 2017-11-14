import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';


class ListComponent extends Component {

constructor(props) {
    super(props);
    this.state = { data: undefined};
    this.detailsData = {};
    this.pageNumber = 1;
    this.pageSize = 2;
    this.feedsLength= this.props.youtubeFeeds().length;
    this.numberOfPages = ( this.feedsLength % this.pageSize ) === 0 ? (this.feedsLength /  this.pageSize) : Math.ceil(this.feedsLength /  this.pageSize);  
   
}


componentWillMount() {
  this.setState({ data: []});
}

componentDidMount() {
   this.setState({data: this.props.youtubeFeeds().slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber)});
 }

componentWillUnmount() {}
shouldComponentUpdate(nextProps,nextState) {  return true; }
componentWillReceiveProps(nextProps) {}


nextPage =(event) => {
  this.numberOfPages = ( this.feedsLength % this.pageSize ) === 0 ? (this.feedsLength /  this.pageSize) : Math.ceil(this.feedsLength /  this.pageSize);  
  
  if(this.pageNumber < this.numberOfPages)
  this.pageNumber += 1;
  this.setState({data: this.props.youtubeFeeds().slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber)});

// event.target.style.cssText = "color: blue; border: 1px solid black"; 


};

prevPage =(event) => {
  this.numberOfPages = ( this.feedsLength % this.pageSize ) === 0 ? (this.feedsLength /  this.pageSize) : Math.ceil(this.feedsLength /  this.pageSize);  
  if(this.pageNumber === 1) return;
  this.pageNumber -= 1;
  this.setState({data: this.props.youtubeFeeds().slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber)});
}

pageChange =(event) => {

this.pageSize = event.target.value;
this.pageNumber = 1;
this.numberOfPages = ( this.feedsLength % this.pageSize ) === 0 ? (this.feedsLength /  this.pageSize) : Math.ceil(this.feedsLength /  this.pageSize);  

this.setState({data: this.props.youtubeFeeds().slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber)});

}


render() {

  let feeds = this.state.data.map((item)=> {
     
      this.detailsData = {pathname: `/details/${encodeURIComponent(item.id.replace(/'?'/g, '%3F'))}`,itemData:item };
      if (item.snippet.title === 'Deleted video')
      return (
            <h2 key = {item.id}>THE VIDEO DOESN'T EXIST ANYMORE</h2>
        );
      return (     

       
        <section className={styles.feedcontainer} key = {item.id}>

        <Link  to = {this.detailsData}>
         {/* <Link to = {`/details/${encodeURIComponent(item.id.replace(/'?'/g, '%3F'))}/secondoptional`}>*/}
           <img alt="not found" src = {item.snippet.thumbnails.medium.url} className={styles.feedimg}/>
         </Link>
          <div className={styles.feedtext}>
           <Link style={{textDecoration:'none', color:'#393939'}} to = {this.detailsData}>
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
      <button onClick= {this.prevPage}>Previous page</button>  
      <select onChange={this.pageChange} ref = 'test'>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
      <button onClick= {this.nextPage}>Next page</button>  

    </div>
  );
}
}

export default ListComponent;