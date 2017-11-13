import React, {Component} from 'react';
//import {search} from '../lib/SpotifyUtil';
import '../App.css';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import Result from './SearchResultComponent';
//import {Alert} from 'reactstrap';
import {Route} from 'react-router-dom';
import FavoritesComponent from './FavoritesComponent'



class SearchFormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search_text: '',
            search_type: 'artist',
            stateSearch: true,
        }
    }

    doSearchFunction() {
            this.props.history.push("/" + this.state.search_text + "/" + this.state.search_type)

    }

    handleChange = (e) => {

        if (e.target.value.length > 0)
            this.setState({search_text: e.target.value})
        else {
            this.setState({search_text: ''})
            this.props.history.push("/")
        }
    }
    handleSelectChange = (e) => {
        this.setState({search_type: e.target.value, search_text: ''})
        this.props.history.push("/")
    }

    render() {
        return (
            <div style={{marginTop: 15}}>
                <div style={{justifyContent: 'center'}} className="row">
                    <div className="col-md-4">
                        <FormGroup className="form_searchButton">
                            <FormControl type="text" placeholder="Search"
                                         onChange={this.handleChange}
                                         value={this.state.search_text}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <div className="row">
                            <select className="form-control form-control-lg" value={this.state.search_type}
                                    onChange={this.handleSelectChange}>
                                <option value="artist">Artist</option>
                                <option value="album">Album</option>
                                <option value="track">Track</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <Button className="btn btn-info" onClick={e => this.doSearchFunction()}>Search</Button>
                    </div>
                </div>
                <hr className="hr"/>
                <div className="float-right"><FavoritesComponent /></div>
                <div style={{marginTop: 15}} className="row">
                    {
                        this.state.stateSearch ?
                            <Route path='/:search_text?/:search_type?' component={Result}/>
                            :
                            <div>Vérifier chamos texte</div>
                    }

                </div>
            </div>
        );
    }
}

export default SearchFormComponent;
