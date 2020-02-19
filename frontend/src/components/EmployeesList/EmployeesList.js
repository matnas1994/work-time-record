import React from 'react';

import Card from '../UI/Card/Card';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import Paginator from '../UI/Paginator/Paginator';
import EmployeeItem from './EmployeeItem/EmployeeItem';

import './EmployeesList.css';

const EmployeesList = props => {

    let employeesRow = null; 
    const lp = (props.currentPage - 1) *  props.employeesPerPage + 1;

    if(props.employees) {
        employeesRow = props.employees.map((employees, index) => 
            <EmployeeItem 
                key = {employees.id} 
                lp = {lp + index}
                id={employees.id} 
                name={employees.name} 
                surname={employees.surname} 
                position={employees.position} 
                onDelete={props.onDelete}
            />);
    }

    return  <Card className="employeesList" title="Lista Pracowników">
        {props.isLoading?<div style={{textAlign: 'center'}}><LoadingSpinner/></div>:
        <React.Fragment>
            <table className="table">
                <thead className="table-head">
                    <tr>
                        <th>Lp</th>
                        <th>Imie</th>
                        <th>Nazwisko</th>
                        <th>Stanowisko</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {employeesRow}
                </tbody>
            </table>
            <div className="table-paginator">
                <div className="table-info">{lp > 0 ? lp : 0 } do {props.employeesPerPage + lp - 1 > props.totalEmployees?  props.totalEmployees : props.employeesPerPage + lp - 1 } z {props.totalEmployees}</div>
                <Paginator 
                    currentPage = {props.currentPage} 
                    onNextPage = {props.onNextPage}
                    onPrevPage = {props.onPrevPage}
                    onChangePage = {props.onChangePage}
                    numberOfpages={props.numberOfpages}
                />
            </div>
        </React.Fragment>
        }
    </Card>;
}

export default EmployeesList;