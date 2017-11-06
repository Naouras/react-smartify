import React, {Component} from 'react';
import {search} from '../lib/SpotifyUtil';
import '../App.css';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import Result from './SearchResultComponent';
import {Alert} from 'reactstrap';


class SearchFormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search_text: '',
            search_type: 'artist',
            search_result: undefined,
            stateSearch: true,
        }
    }

    doSearchFunction() {
        if (this.state.search_text) {
            search(this.state.search_text, this.state.search_type).then(
                json => {
                    this.setState({search_result: json})
                })
            this.setState({stateSearch: true})
            this.props.history.push('/smartify/' + this.state.search_type)
        }
        else {
            this.setState({stateSearch: false})
        }
    }

    handleChange = (e) => this.setState({search_text: e.target.value})
    handleSelectChange = (e) => {
        this.setState({search_type: e.target.value, search_result: undefined, search_text: ''})
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
                        <Button className="btn btn-info"  onClick={e => this.doSearchFunction()}>Search</Button>
                    </div>
                </div>
                <hr className="hr"/>
                <div style={{marginTop: 15}} className="row">
                    {this.state.stateSearch === true ?
                        <Result result={this.state.search_result} type={this.state.search_type}/>
                        :
                        <div style={{margin: 50, width: '100%'}}>
                            <Alert color="warning">
                                <strong>Info!</strong> You should input What are you looking for.
                            </Alert>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default SearchFormComponent;
