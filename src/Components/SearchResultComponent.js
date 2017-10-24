import React, { Component } from 'react';
import Artist from './ArtistComponent';
import Album from './AlbumComponent';
import Track from './TrackComponent'

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            typeSearch: this.props.type 
        } ;
      }
      componentWillReceiveProps() {
        this.setState({typeSearch:this.props.type})
      }
    render(){
        return (  
            <div>
    
    {
        this.state.typeSearch ==='artist'
        ?
        <Artist resultArtist={this.props.result} />
       :
        null        
    }
    {
        this.state.typeSearch ==='album'
        ?
        <Album resultAlbum={this.props.result} />
       :
        null        
    }
    {
        this.state.typeSearch ==='track'
        ?
        <Track resultTrack={this.props.result} />
       :
        null        
    }
                

            </div>            
          ) 
    }

}


export default Result;