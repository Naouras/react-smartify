import React, {Component} from 'react';
import Artist from './ArtistComponent';
import Album from './AlbumComponent';
import TracksList from './TracksComponent'

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSearch: this.props.type,
            resultSearch: undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({typeSearch: nextProps.type})
    }

    componentDidMount() {
        this.setState({resultSearch: this.props.result})
    }

    render() {
        const renderComponent = () => {
            let self = this;
            let component = null;
            if (this.props.result) {
                switch (self.state.typeSearch) {
                    case 'artist':
                        component = <Artist resultArtist={self.props.result.artists.items}/>
                        break;
                    case 'album':
                        component = <Album resultAlbum={self.props.result.albums.items}/>
                        break;
                    case 'track':
                        component = <TracksList Tracks={self.props.result.tracks.items}/>
                        break;
                    default:
                        break;
                }
                return component;
            }
            else return null
        }

        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        );
    }

}


export default Result;