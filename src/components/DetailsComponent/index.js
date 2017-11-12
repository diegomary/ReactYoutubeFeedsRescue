import React, {Component } from 'react';
import './styles.css';

class DetailsComponent extends Component {
  render() {
    return (
      <div>
        <h1>
          Details Component id: {this.props.match.params.id}         
        </h1>
        <h1>        
          Details Component optionalParameter: {this.props.match.params.optionalparam}
        </h1>
      </div>
    );
  }
}

DetailsComponent.defaultProps = { prop1:'property1', prop2:'property2' };
export default  DetailsComponent