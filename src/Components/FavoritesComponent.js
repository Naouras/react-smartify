import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LikeSong, dislikeSong } from '../actions';
import FaHeart from 'react-icons/lib/fa/heart';


class FavoritesComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){

        return (<div>
                <button type="button" className="btn  borderButton" data-toggle="modal" data-target="#favoriteTracks" style={{backgroundColor:'yellow'}}>
                    Your Favorite Tracks
                </button>

                <div className="modal fade" id="favoriteTracks" tabIndex="-1" role="dialog" aria-labelledby="favoriteTracksLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
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
                                    {
                                        this.props.song && this.props.song.map((res,i)=>{
                                            return(
                                                <ul className="list-group" key={i}>
                                                    <li className="list-group-item" key={i}>{res.name}
                                                        <button key={i} type="button" className="btn btn-default btn-sm borderButton"
                                                                onClick={() => {
                                                                    this.props.dislikeSong(res)
                                                                }}>
                                                             <FaHeart style={{color: 'red'}}/>
                                                        </button>
                                                    </li>
                                                </ul>
                                            )
                                        })
                                    }
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
    song: state.SongsReducer,
});

const mapDispatchToProps = {
    LikeSong,
    dislikeSong,
};

FavoritesComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritesComponent);

export default FavoritesComponent;