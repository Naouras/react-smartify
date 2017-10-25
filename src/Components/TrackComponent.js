import React, {Component} from 'react';

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_tracks: ''
        };
        console.log("tracks", this.props.resultTrack);
    }

    render() {
        console.log("artists", this.props.resultTrack.artists);
        return (
            <div>
                {
                    this.props.resultTrack ?
                        <div> {this.props.resultTrack.map(obj =>
                            <div id="accordion" role="tablist" aria-multiselectable="true" key={obj.id}>
                                <div className="card">
                                    <div className="card-header" role="tab" id={(obj.name + obj.id).replace(/ /g, '')}>
                                        <h5 className="mb-0">
                                            <a data-toggle="collapse" href={'#' + obj.id} aria-controls={obj.id}>
                                                {obj.name}
                                            </a>
                                        </h5>
                                    </div>
                                </div>
                                <div id={obj.id} className="collapse" role="tabpanel"
                                     aria-labelledby={(obj.name + obj.id).replace(/ /g, '')} data-parent="#accordion">
                                    <div className="card-block">
                                        <ul className="list-group">
                                            <li className="list-group-item">Album Name: {obj.album.name}</li>
                                            <li className="list-group-item">Artist Name: {obj.id}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        </div>
                        :
                        undefined

                }

            </div>
        )
    }

}

export default Track;