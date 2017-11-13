import React, {Component } from 'react';
import './styles.css';

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
      <div>
        <h1>
          Details Component id: {decodeURIComponent(this.props.match.params.id)}         
        </h1>
        <h1>        
          Details Component optionalParameter: {this.props.match.params.optionalparam}
        </h1>
        <p>{this.item.snippet.description}</p>

      </div>
    );
  }
}
export default  DetailsComponent