import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import Task from './Task';

export default class TaskList extends Component {
    constructor (props) {
        super(props);
        this.state = { modal: false, task: {id: 0, title: "", date: "", author: "", status: "", description: ""} }
        this.toggle = this.toggle.bind(this);
      }

    toggle(id) {
        this.setState({
            modal: !this.state.modal
        }, function() {
            if (this.state.modal == true)
            {
                const cachedTask= localStorage.getItem('task'+id);
                if (!cachedTask) {
                    fetch('/api/v1/task/'+id)
                    .then(response => {
                        return response.json()
                    })
                    .then(taskInfo => {
                        this.setState({task: taskInfo})
                        localStorage.setItem('task'+id, JSON.stringify(taskInfo));
                    })
                } else {
                    //console.log('LOADING FROM CACHE'); checking if local cache works
                    this.setState({task: JSON.parse(cachedTask)})
                }
            }
        });
    }

    renderModal() {
        return (
            <div>
                
                <Modal isOpen={this.state.modal}>
                    <ModalHeader>Информация о задаче № {this.state.task.id}</ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="form-group">
                                <label className="col-form-label">Заголовок</label>
                                <div className="col-sm-10">{this.state.task.title}</div>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Дата</label>
                                <div className="col-sm-10">{this.state.task.date}</div>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Автор</label>
                                <div className="col-sm-10">{this.state.task.author}</div>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Статус</label>
                                <div className="col-sm-10">{this.state.task.status}</div>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Описание</label>
                                <div className="col-sm-10">{this.state.task.description}</div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Закрыть</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
      
    renderRows() {
        return this.props.taskList.map( task => {
            return (
                <Task key={task.id} id={task.id} title={task.title} date={task.date} click={(id) => this.toggle(task.id)}/>
            )
        })
    }
    render() {
        return (
            <div>
                <table className="table table-striped table-hover">
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
            { this.renderModal() }
           </div>
        )
    }
}

