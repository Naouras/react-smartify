import React, { Component } from 'react';

class Artist extends Component {
    componentDidMount() {
        console.log('GrandChild did mount.', this.props.resultArtist);
    }
    render() {
        return (
            <div>

                {
                    this.props.resultArtist ?
                        <div> {this.props.resultArtist.artists.items.map((obj, i) =>
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
                                        {obj.external_urls.spotify}
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


export default Artist;