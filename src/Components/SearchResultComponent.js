import React, {Component} from 'react';
import Artist from './ArtistComponent';
import Album from './AlbumComponent';
import TracksList from './TracksComponent';
import {Route} from 'react-router-dom';


class SearchResultComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSearch: undefined,
            resultSearch: null,
            search_text: undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({typeSearch: nextProps.type})
    }

    components() {
        let component = null;
        switch (this.props.match.params.search_type) {
            case "artist":
                component = <Route path="/:search_text/:search_type" component={Artist}/>
                break
            case "album":
                component = <Route path="/:search_text/:search_type" component={Album}/>
                break
            case "track":
                component = <Route path="/:search_text/:search_type" component={TracksList}/>
                break
            default:
                component
        }
        return component
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8">
                        {this.components()}
                    </div>
                </div>
            </div>
        );
    }

}


export default SearchResultComponent;