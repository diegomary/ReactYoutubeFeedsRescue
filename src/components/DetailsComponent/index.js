import React, {Component } from 'react';
import './styles.css';

class DetailsComponent extends Component {
constructor(props) {
    super(props);
    this.store= JSON.parse(localStorage.getItem(decodeURIComponent(this.props.match.params.id)));
    localStorage.clear();  
}




  render() {

  
    return (
      <div>
        <h1>
          Details Component id: {decodeURIComponent(this.props.match.params.id)}         
        </h1>
        <h1>        
          Details Component optionalParameter: {this.props.match.params.optionalparam}
        </h1>
        <p>{this.store.snippet.description}</p>

      </div>
    );
  }
}
export default  DetailsComponent