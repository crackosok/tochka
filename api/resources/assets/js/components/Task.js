import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Task extends Component {
    constructor (props) {
        super(props);
         }
    render() {
        return (
            <tr onClick={this.props.click}>
                <td>{this.props.id}</td>
                <td>{this.props.title}</td>
                <td>{this.props.date}</td>
            </tr>
        )
    }
}