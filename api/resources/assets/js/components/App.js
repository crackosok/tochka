import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

import TaskList from './TaskList';
import Search from './Search';

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {taskList: [], taskListFull: [], taskListSearch: [], pageCount:0, isSearching: false};
        this.handlePageClick = this.handlePageClick.bind(this);
        this.getTasksPage = this.getTasksPage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.getSearchPage = this.getSearchPage.bind(this);
    }
    componentDidMount() {
        fetch('/api/v1/task/')
            .then(response => {
                return response.json();
            })
            .then(taskList => {
                this.setState({ taskListFull: taskList})
            })
            .then(taskListFull => {
                this.getTasksPage(0);
                this.setState({pageCount: this.state.taskListFull.length / this.props.perPage})
            })
    }
    getTasksPage(pagenum) {
        var offset = pagenum * this.props.perPage;
        var tasksPage = this.state.taskListFull.slice(offset, offset+this.props.perPage)
        this.setState({taskList: tasksPage});
    }
    getSearchPage(pagenum) {
        var offset = pagenum * this.props.perPage;
        var tasksPage = this.state.taskListSearch.slice(offset, offset+this.props.perPage)
        this.setState({taskList: tasksPage});
    }
    handlePageClick(data) {
        this.state.isSearching? this.getSearchPage(data.selected) : this.getTasksPage(data.selected)
      }  
    handleSearch(event) {
        var taskFilter = this.state.taskListFull;
        var searchPhrase = event.target.value.toLowerCase();
        taskFilter = taskFilter.filter(function(item){
          return item.title.toLowerCase().search(
            searchPhrase) !== -1;
        });
        this.setState({taskListSearch: taskFilter}, () => {
            if (searchPhrase.length !== 0) {
                this.setState({pageCount: this.state.taskListSearch.length / this.props.perPage})
                this.getSearchPage(0);
                this.setState({isSearching: true})
            } else {
                this.setState({isSearching: false})
                this.setState({pageCount: this.state.taskListFull.length / this.props.perPage});
                this.getTasksPage(0);
            }
        });
    }
    render() {
        return (
            <div>
                <Search handleSearch={this.handleSearch}/>
                <TaskList taskList={this.state.taskList}/>
                <ReactPaginate previousLabel={"<"}
                       nextLabel={">"}
                       breakLabel={<a href="" className="page-link">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={3}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination justify-content-center"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} 
                       pageLinkClassName={"page-link"}
                       previousLinkClassName={"page-link"}
                       nextLinkClassName={"page-link"}/>
                       
            </div>
        )
        
    }
}
if (document.getElementById('app')) {
    ReactDOM.render(<App perPage={10} />, document.getElementById('app'));
}
