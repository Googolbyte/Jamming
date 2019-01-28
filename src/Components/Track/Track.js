import React, { Component } from 'react';
import './track.css';

class Track extends Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
    //console.log(this.props.onAdd);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if(this.props.isRemoval) {
      return (<a className="Track-action" onClick={this.removeTrack}> - </a>);
    } else {
      return (<a className="Track-action" onClick={this.addTrack}> + </a>);
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action">{this.renderAction()}</a>
      </div>
    );
  }
}

export default Track;

/*
Between the h3 tags, <!-- track name will go here -->

Between the p tags, <!-- track artist will go here--> | <!-- track album will go here -->

Between the a tags, <!-- + or - will go here -->
*/
