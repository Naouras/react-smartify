import React, {Component} from 'react';
import Artist from './ArtistComponent';
import Album from './AlbumComponent';
import TracksList from './TracksComponent';
import { Route,withRouter } from 'react-router';


class SearchResultComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSearch: undefined,
        };
    }

    componentWillReceiveProps(props, nextProps) {
        /*/props.match.param && (props.match.param.search_type !== nextProps.match.param.search_type) ?
        this.setState({typeSearch: nextProps.search_type}) : null*/
    }
    render() {
        //console.log(this.props.match.params)
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8">
                        {
                            this.props.match.params.search_type === 'artist' ?
                                <Route path="/:search_text/:search_type/:artistId?" component={Artist}/>
                                :
                                null
                        }
                        {
                            this.props.match.params.search_type === 'album' ?
                                <Route path="/:search_text/:search_type/:artistId?/:albumId?" component={Album}/>
                                :
                                null
                        }
                        {
                            this.props.match.params.search_type === 'track' ?
                                <Route path="/:search_text/:search_type/:artistId?/:albumId?/:trackId?" component={TracksList}/>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        );
    }

}


export default withRouter(SearchResultComponent);