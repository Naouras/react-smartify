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
            search_result: undefined
        }
    }

    render() {
        return (
            <div style={{marginTop: 15}}>
                <div style={{justifyContent: 'center'}} className="row">
                    <FormGroup bsSize="large" className="form_searchButton">
                        <FormControl type="text" placeholder="Search"
                                     onChange={e => this.setState({search_text: e.target.value})}
                                     value={this.state.search_text}/>
                    </FormGroup>
                </div>
                <div style={{justifyContent: 'center'}} className="row">
                    <input type="radio" checked={this.state.search_type === 'artist'}
                           onChange={e => {this.setState({search_type: 'artist',search_result:undefined})}}/>Artist{' '}
                    <input type="radio" checked={this.state.search_type === 'album'}
                           onChange={e => this.setState({search_type: 'album',search_result:undefined})}/>Album{' '}
                    <input type="radio" checked={this.state.search_type === 'track'}
                           onChange={e => this.setState({search_type: 'track',search_result:undefined})}/>Track
                </div>
                <div style={{justifyContent: 'center', marginTop: 15}} className="row">
                    <Button bsStyle="info" onClick={e => this.doSearchFunction()}>Search</Button>
                </div>
                <div style={{justifyContent: 'center', marginTop: 15}} className="row">
                    <Result result={this.state.search_result} type={this.state.search_type}/>
                </div>
            </div>
        );
    }

    doSearchFunction() {
        search(this.state.search_text, this.state.search_type).then(
            json => {
                this.setState({search_result: json})
            })
    }
}

export default Form;
