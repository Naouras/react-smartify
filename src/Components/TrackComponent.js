import React, { Component } from 'react';

class Track extends Component {
    render() {
        return (
            <div>
                {
                    this.props.resultTrack ?
                        <div> {this.props.resultTrack.tracks.items.map((obj, i) =>
                            <div id="accordion" role="tablist" aria-multiselectable="true" key={i}>
                                <div className="card">
                                    <div className="card-header" role="tab" id="headingOne">
                                        <h5 className="mb-0">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                {obj.name}
                                            </a>
                                        </h5>
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