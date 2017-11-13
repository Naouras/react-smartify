import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dislikeSong} from '../actions';
import FaTrash from 'react-icons/lib/fa/trash';
import FaStar from 'react-icons/lib/fa/star';
import {withRouter } from 'react-router';


class FavoritesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (<div>
                <button type="button" className="btn btn-default btn-sm" data-toggle="modal"
                        data-target="#favoriteTracks">
                    <FaStar style={{color: 'red'}}/>
                    Your Favorite Track(s)
                </button>

                <div className="modal fade" id="favoriteTracks" tabIndex="-1" role="dialog"
                     aria-labelledby="favoriteTracksLabel" aria-hidden="true" style={{padding: 100}}>
                    <div className="modal-dialog modal-lg modelHeight" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="favoriteTracksLabel">Favorite Tracks</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div id="accordion-favorites" role="tablist">
                                    <div className="alert alert-secondary" role="alert">
                                        Favorite List
                                    </div>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th >Track Name</th>
                                            <th>Artist Name</th>
                                            <th>Remove The Track</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {   this.props.song ?
                                             this.props.song.map((res, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{res.name}</td>
                                                        <td>
                                                        {res.artists.map((art, i) => {
                                                            return (<ul key={i}><li>{art.name}</li></ul>)
                                                        })}
                                                        </td>
                                                        <td>
                                                            <button key={i} type="button"
                                                                    className="btn btn-default btn-sm borderButton"
                                                                    onClick={() => {
                                                                        this.props.dislikeSong(res)
                                                                    }}>
                                                                <FaTrash style={{color: 'red'}}/>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            null
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    song: state.tracksReducer,
});

const mapDispatchToProps = {
    dislikeSong,
};

FavoritesComponent = connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);

export default withRouter(FavoritesComponent);