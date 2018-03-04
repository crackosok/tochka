import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Task from './Task';

export default class TaskList extends Component {
    constructor (props) {
        super(props);
      }
      
    renderRows() {
        return this.props.taskList.map( task => {
            return (
                <Task key={task.id} id={task.id} title={task.title} date={task.date} />
            )
        })
    }
    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Номер задачи</th>
                        <th>Заголовок</th>
                        <th>Дата выполнения</th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderRows() } 
                </tbody>
            </table>
           
        )
    }
}

