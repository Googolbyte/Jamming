import React, { Component } from 'react';
import './searchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  handleEnterKey(event) {
    var keyPress = event.which;
    if (keyPress === 13) {
      this.search();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input id="searchBar" placeholder="Enter A Song, Album, or Artist"
         onKeyPress={this.handleEnterKey} onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
