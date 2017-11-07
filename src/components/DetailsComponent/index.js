import React, {Component } from 'react';
import './styles.css';

export default class DetailsComponent extends Component {

  render() { 

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