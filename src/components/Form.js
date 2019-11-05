import React, { Component } from 'react';
import Canvas from './Canvas';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formSubmission: '',
      formSubmissionSplit: [],
      spotifyUser: '',
      playlistUri: '',
      albumArtArray: [],
      arrayBuilt: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.parseInput = this.parseInput.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
  }

  // Reads and parses user input into array

  handleChange(event) {
    this.setState({formSubmission: event.target.value});
    this.setState({formSubmissionSplit: event.target.value.split(":")});
  }

  // Validates user input, only continues with proper URI

  handleSubmit(event) {
    event.preventDefault();
    if (RegExp("^" + "spotify:playlist:*".split("*").join(".*") + "$").test(this.state.formSubmission) === false){
      alert("Please enter a valid URI")
    } else {
      this.parseInput();
    }    
  }

  // Split Parsed Input Array Into User and Playlist States

  parseInput(){
    console.log("User Input: " + this.state.formSubmission);
    console.log(this.state.formSubmissionSplit);
    this.setState({playlistUri: this.state.formSubmissionSplit[2]}, 
      function () {console.log("Playlist URI: " + this.state.playlistUri); 
      this.getPlaylist();
    });
  }

  // Get Playlist From Spotify API

  getPlaylist() {
    var maxCount = 0;
    var uniqueUrls = [];
    spotifyApi.getPlaylistTracks(this.state.playlistUri,null,null)
      .then((response) => {
        if(response.total <= 100){
          maxCount = response.total;
        } else {
          maxCount = 100;
        }
        for (var i = 0; i < maxCount; i = i + 1) {
          // Ignore local files in playlist since they won't be able to fetch images
          if(response.items[i].is_local === true){
            i = i + 1;
          }
          else {
            // Only push unique Images to albumArtArray
            if(uniqueUrls.indexOf(response.items[i].track.album.images[1].url) === -1) {
              uniqueUrls.push(response.items[i].track.album.images[1].url);
              var img = new Image();
              img.src = response.items[i].track.album.images[1].url;
              this.setState({ albumArtArray: [...this.state.albumArtArray, img] })
            }
            else {
              i = i + 1;
            }
          }
        };
        if(uniqueUrls.length < 9){
          alert("Please use a playlist with tracks from 9 or more unique albums");
          uniqueUrls = [];
        }
        else {
          this.setState({arrayBuilt: true});
        }
      });
      console.log("Hello unique urls");
      console.log(uniqueUrls);
    }

  render() {
    return (

      <div>
      {  this.state.arrayBuilt ? 
      
        <Canvas arrayBuilt={this.state.arrayBuilt} albumArtArray={this.state.albumArtArray}/>
        
        :

        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </div>          
        </form>  

      }
      </div>
    )
  }
}

export default Form;