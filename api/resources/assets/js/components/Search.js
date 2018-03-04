import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Search extends Component {
    constructor (props) {
        super(props);
      }
    render() {
        return(
            <form className="justify-content-center mb-2">
                <div className="form-group">
                    <input className="form-control" type="text" onChange={this.props.handleSearch} placeholder="Поиск..."/>
                </div>
            </form>
        )
    }
}