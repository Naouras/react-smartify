import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dislikeSong } from '../actions';
import FaTrash from 'react-icons/lib/fa/trash';
import FaHeart from 'react-icons/lib/fa/heart';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
  song: PropTypes.array,
  dislikeSong: PropTypes.func
};
class FavoritesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }
  render() {
    const actions = [<FlatButton label="Close" primary onClick={e => this.handleClose()} />];
    return (
      <div>
        <button className="btn btn-default border" onClick={e => this.handleOpen()}>
          <FaHeart style={{ color: '#28a4c9' }} />
        </button>
        <Dialog
          title=" Favorite Tracks List"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={e => this.handleClose()}
          autoScrollBodyContent
        >
          <table className="table">
            <thead>
              <tr>
                <th>Track Name</th>
                <th>Artist Name</th>
                <th>Remove The Track</th>
              </tr>
            </thead>
            <tbody>
              {this.props.song
                ? this.props.song.map((res, i) => {
                    return (
                      <tr key={i}>
                        <td>{res.name}</td>
                        <td>
                          {res.artists.map((art, i) => {
                            return (
                              <ul key={i}>
                                <li>{art.name}</li>
                              </ul>
                            );
                          })}
                        </td>
                        <td>
                          <button
                            key={i}
                            type="button"
                            className="btn btn-default btn-sm borderButton"
                            onClick={e => {
                              this.props.dislikeSong(res);
                            }}
                          >
                            <FaTrash style={{ color: 'red' }} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  song: state.tracksReducer
});

const mapDispatchToProps = {
  dislikeSong
};
const FavoritesComponentResult = connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);
FavoritesComponent.propTypes = propTypes;
export default withRouter(FavoritesComponentResult);

