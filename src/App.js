import React, { Component } from 'react';
import './App.css';
import Form from './components/Form.js';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();

    // Spotify authorization

    const params = this.getHashParams();
    const token = params.access_token;


    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <div className="App">

        <h1>Create Album Art Grids</h1>
                
        { this.state.loggedIn ? 
          <Form /> :
          <a href='https://gb-test-kitchen.site/login' ><button>Login to Spotify</button></a>
        }

      </div>

    );
  }
}

export default App;