import React, { Component } from 'react';

class Album extends Component {
    render() {
        return (
            <div>
                {
                    this.props.resultAlbum ?
                        <div> {this.props.resultAlbum.albums.items.map((obj, i) =>
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
                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                    <div className="card-block">
                                        {obj.type}
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


export default Album;