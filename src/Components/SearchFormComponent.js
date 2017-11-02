import React, {Component} from 'react';
import {search} from '../lib/SpotifyUtil';
import '../App.css';
import {FormGroup, FormControl, Button} from 'react-bootstrap'
import Result from './SearchResultComponent'

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search_text: '',
            search_type: 'artist',
            search_result: undefined,
            stateSearch: false
        }
    }

    doSearchFunction() {
        if (this.state.search_text) {
            search(this.state.search_text, this.state.search_type).then(
                json => {
                    this.setState({search_result: json})
                })
            this.setState({stateSearch: true})
        }
        else this.setState({stateSearch: false})
    }

    render() {
        return (
            <div style={{marginTop: 15}}>
                <div style={{justifyContent: 'center'}} className="row">
                    <div className="col-md-4">
                        <FormGroup bsSize="large" className="form_searchButton">
                            <FormControl type="text" placeholder="Search"
                                         onChange={e => this.setState({search_text: e.target.value})}
                                         value={this.state.search_text}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={{paddingTop: 10}}>
                            <input type="radio" checked={this.state.search_type === 'artist'}
                                   onChange={e => {
                                       this.setState({search_type: 'artist', search_result: undefined, search_text: ''})
                                   }}/>Artist{' '}
                            <input type="radio" checked={this.state.search_type === 'album'}
                                   onChange={e => this.setState({
                                       search_type: 'album',
                                       search_result: undefined,
                                       search_text: ''
                                   })}/>Album{' '}
                            <input type="radio" checked={this.state.search_type === 'track'}
                                   onChange={e => this.setState({
                                       search_type: 'track',
                                       search_result: undefined,
                                       search_text: ''
                                   })}/>Track
                        </div>
                    </div>
                </div>
                <div style={{justifyContent: 'center', marginTop: 15}} className="row">
                    <Button bsStyle="info" onClick={e => this.doSearchFunction()}>Search</Button>
                </div>
                <div style={{marginTop: 15}} className="row">
                    {this.state.stateSearch === true ?
                        <Result result={this.state.search_result} type={this.state.search_type}/>
                        :
                        <div className="alert alert-info" style={{margin:50,width:'100%'}}>
                            <strong>Info!</strong> You should input What are you looking for .
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Form;
