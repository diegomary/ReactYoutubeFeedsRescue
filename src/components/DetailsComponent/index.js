import React, {Component } from 'react';
import './styles.css';

class DetailsComponent extends Component {

  render() { 
  	console.log(this.props);

	let pp =this.props.match.params.id

    return (
      <div>
        <h1>
          Details Component {pp}
        </h1>
      </div>
    );
  }
}

DetailsComponent.defaultProps = { prop1:'property1', prop2:'property2' };
export default  DetailsComponent