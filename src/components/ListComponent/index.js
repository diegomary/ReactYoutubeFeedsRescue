import React, { Component } from 'react';
import * as d3 from "d3";
import { Link } from 'react-router-dom';
import styles from './styles.css';

class ListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { data: undefined};
    this.detailsData = {};
    this.searchResult = [];
    this.pageNumber = 1;
    this.pageSize = 5;
    this.feedsLength= this.props.youtubeFeeds().length;
    this.numberOfPages = ( this.feedsLength % this.pageSize ) === 0 ? (this.feedsLength /  this.pageSize) : Math.ceil(this.feedsLength /  this.pageSize);  
    this.isSelected = {element: null, isSelected : false};
  };

  componentWillMount() { this.setState({ data: []}); };
  // Disable back button
  onBackButtonEvent = (e) => {
    this.props.history.go(1);
    e.preventDefault();
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
    this.props.history.push(this.props.location.pathname, null);   
    this.refs.searchFeed.value = this.props.defaultSearch;
    this.searchResult = this.props.youtubeFeeds();
    this.setState({data: this.searchResult.slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber)});
  };

  componentWillUnmount() {};
  shouldComponentUpdate(nextProps,nextState) {  return true; };
  componentWillReceiveProps(nextProps) {};

  searchFeeds = () => {
   let criteria = this.refs.searchFeed.value;
   if(!criteria) return;
   let promise = this.props.foundFeeds(criteria);
   promise.then(response =>{
       if (response.status >= 400) { return 'error'; }
       return response.json() })
       .then(json => {
        this.pageNumber = 1;   
        this.feedsLength= json.items.length;
        this.searchResult = json.items;
        this.setState({          
            data: ( json === 'error' ? 'error' : json.items.slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber))
        });
    });  
  };

  nextPage =(event) => {
    this.numberOfPages = ( this.feedsLength % this.pageSize ) === 0 ? (this.feedsLength /  this.pageSize) : Math.ceil(this.feedsLength /  this.pageSize);  
    if(this.pageNumber < this.numberOfPages)
    this.pageNumber += 1;    
    this.setState({data: this.searchResult.slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber)});
  };

  prevPage =(event) => {
    this.numberOfPages = ( this.feedsLength % this.pageSize ) === 0 ? (this.feedsLength /  this.pageSize) : Math.ceil(this.feedsLength /  this.pageSize);  
    if(this.pageNumber === 1) return; 
    this.pageNumber -= 1;    
    this.setState({data: this.searchResult.slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber)});    
  };

  pageChange =(event) => {
    this.pageSize = event.target.value;
    this.pageNumber = 1;
    this.numberOfPages = ( this.feedsLength % this.pageSize ) === 0 ? (this.feedsLength /  this.pageSize) : Math.ceil(this.feedsLength /  this.pageSize);  
    this.setState({data: this.searchResult.slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber)});
  };

  goToPage = (event) => {
    this.pageNumber = parseInt(event.target.dataset.link,10);    
    this.setState({data: this.searchResult.slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber)});
    this.isSelected = { element:this.pageNumber, isSelected: true};
    event.preventDefault();
  };

  goToFirst = (event) => {
    this.pageNumber=1;    
    this.setState({data: this.searchResult.slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber)});
  };

  goToLast = (event) => {
    this.pageNumber = this.numberOfPages;    
    this.setState({data: this.searchResult.slice((this.pageNumber - 1) * this.pageSize , this.pageSize * this.pageNumber)});
  };

  render() {

    let pages =[];
    for(let i = 1; i <= this.numberOfPages; i++)
    {
      pages.push((()=>{       
        let linkCss = (this.pageNumber === i) ? styles.linkStyleSelected : styles.linkStyle;      
        return (          
          <a onClick= {this.goToPage} className = {linkCss} data-link={i}  key={i}>{i}</a>        
        )
      })());
    }
    let feeds = this.state.data.map((item)=> {     
      this.detailsData = {pathname: `/details/${encodeURIComponent(item.etag.replace(/'?'/g, '%3F'))}`,itemData:item };
      if (item.snippet.title === 'Deleted video')
      return (
            <h2 key = {item.etag}>THE VIDEO DOESN'T EXIST ANYMORE</h2>
      );
      return (       
        <section className={styles.feedcontainer} key = {item.etag}>
          <Link  to = {this.detailsData}>         
             <img alt="not found" src = {item.snippet.thumbnails.medium.url} className={styles.feedimg}/>
          </Link>
          <div className={styles.feedtext}>
            <Link style={{textDecoration:'none', color:'#393939'}} to = {this.detailsData}>         
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
        <input type="text" ref="searchFeed"/>        
        <button onClick={this.searchFeeds}>Search</button>
        {feeds}
        <div className={styles.pagination}>
        <div>
        <button className = {styles.pageButton} onClick= {this.goToFirst}><i className="fa fa-angle-double-left" aria-hidden="true"></i></button>
        <button className = {styles.pageButton} onClick= {this.prevPage}><i className="fa fa-angle-left" aria-hidden="true"></i></button>  
        {pages} 
        <span className = {styles.pagesForMobile}>{this.pageNumber} of {this.numberOfPages}</span>
        <button className = {styles.pageButton} onClick= {this.nextPage}><i className="fa fa-angle-right" aria-hidden="true"></i></button>
        <button className = {styles.pageButton} onClick= {this.goToLast}><i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
        </div>
        <div>
        <span className={styles.resPerPage}>Results per page: </span>
        <select className = {styles.selectStyle} onChange={this.pageChange} ref = 'test'>          
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select> 
        </div>  
        </div>
      </div>
    );
  };
}

export default ListComponent;