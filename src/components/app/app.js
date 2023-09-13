import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';


class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [              // имитируем приход данных с сервера
                {name: 'John Smith', salary: 1000, increase:true, rise: true, id: 1},
                {name: 'Alex Ten', salary: 800, increase:false, rise: false, id: 2},
                {name: 'Ann Sokol', salary: 3000, increase:true, rise: false, id: 3}
            ], 
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        // сложный способ:
        //this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id);

            // const old = data[index];
            // const newItem = {...old, increase: !old.increase};   // ...old – новый объект
            // const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            // return {
            //     data: newArr
            // }

            // постой способ:
        this.setState(({data}) => ({
            data: data.map(item => {        // метод map возвращает новый массив
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === '') {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1         // -1 – это чтобы индекс, который начинается с 1, стал с 0
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterEmp = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'salary':
                return items.filter(item => item.salary >= 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {    
        const {data, term, filter} = this.state; 
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.filterEmp(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                employees={employees}
                increased={increased}/>

                <div className="search-panel">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>      
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}
export default App;