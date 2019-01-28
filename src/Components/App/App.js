import React, { Component } from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '..//SearchResults/SearchResults';
import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          name: 'I cant fekin run',
          artist: 'Loca',
          album: 'Loca the Pug',
          id: '1234'
        },
        {
          name: 'I cant fekin run',
          artist: 'Loca',
          album: 'Loca the Pug',
          id: '2234'
        },
        {
          name: 'I cant fekin run',
          artist: 'Loca',
          album: 'Loca the Pug',
          id: '3234'
        }
      ],
      playlistName: 'Playlist Name',
      playlistTracks: [
        {
          name: 'Remove Me',
          artist: 'Artist',
          album: 'Album',
          id: '0000'
        },
      ]
    };

    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
       return;
     } else {
       let tracks = this.state.playlistTracks;
       tracks.push(track);
       this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track) {
    let filteredPlaylist = this.state.playlistTracks.filter(
      savedTrack => savedTrack.id !== track.id);
    this.setState( {playlistTracks: filteredPlaylist} );
  }

  savePlaylist() {
    //Generate an array of uri values called
    //trackURIs from the playlistTracks property
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({ playlistTracks: [] });
    }).then(() => { this.updatePlaylistName('New Playlist'); });
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({ searchResults: tracks });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}
          onAdd={this.addTrack} />
          <Playlist playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack}
          onSave={this.savePlaylist}
          onNameChange={this.updatePlaylistName}
          />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
