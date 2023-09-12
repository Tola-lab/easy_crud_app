import EmployeesListItem from '../employees-list-item/employees-list-item';
import './employees-list.css';

const EmployeesList = ({data, onDelete}) => {     // сюда приходят данные с сервера

    const elements = data.map(item => {     // перебираем их
        const {id, ...itemProps} = item;
        return (
            <EmployeesListItem 
                key={id} {...itemProps}
                onDelete={() => {onDelete(id)}}/>
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployeesList;