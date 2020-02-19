import React, {useState, useEffect, useRef} from 'react';

import EmployeesList from '../../components/EmployeesList/EmployeesList';
import Search from '../../components/UI/Search/Search';

import {useHttpClient} from '../../hooks/http-hook';
import {usePaginator} from '../../hooks/paginator-hook';


const Employees = props => {
    const isInitialMount = useRef(true);
    const [filterQuery, setFilterQuery] = useState('');
    const [employees, setEmployees] = useState([]);
    const [isLoading, error, sendRequest] = useHttpClient();
    const [nextPageHandler, changePageHandler, prevPageHandler, changeTotalElementsHandler, paginatorState] = usePaginator({elementPerPage: 3});
    const [enteredFilters, setEnteredFilters] = useState({name: '', surname: '', position: '' });

    useEffect(() => {
        if(!isInitialMount.current){
            const timer = setTimeout(() => {
                let query = ''; 
                for (const filter in enteredFilters) {
                    query+=`&${filter}=${enteredFilters[filter]}`;
                }
                setFilterQuery(query); 
                changePageHandler(1);    
            }, 1000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [enteredFilters, changePageHandler]);

    useEffect(() => {
        isInitialMount.current = false;
    }, []);
    
    useEffect(() => {
        const fetchEmployees = async () => {
        try{
            const responseData = await sendRequest(`http://localhost:5000/api/employees?pageSize=${paginatorState.elementPerPage}&page=${paginatorState.currentPage}${filterQuery}`);
            setEmployees(responseData.employees);
            changeTotalElementsHandler(responseData.amount);
        } catch(err){
            console.log(err);
        }
      }; 

      if(paginatorState.currentPage > 0){
            fetchEmployees();
      }
    },[setEmployees, sendRequest, changeTotalElementsHandler, paginatorState.elementPerPage, paginatorState.currentPage, filterQuery]);

 
    const onChangeFilter = (e) => {
        const filterId = e.target.id;
        const newValue = e.target.value;
        setEnteredFilters(prevState  => {
            return {...prevState, [filterId] : newValue}
        });
    };

    const onDeleteHandler = async (eid) => {
        try{
            await sendRequest('http://localhost:5000/api/employees/' + eid, 'DELETE');
            setEmployees(employees.filter(emp => emp.id !== eid));
        } catch(err){}
    }

    return <div>
            <Search filters={enteredFilters} onChange={onChangeFilter}/>
            <EmployeesList 
                onNextPage = {nextPageHandler}
                onPrevPage = {prevPageHandler}
                onChangePage = {changePageHandler}
                totalEmployees={paginatorState.totalElements} 
                currentPage={paginatorState.currentPage} 
                employeesPerPage={paginatorState.elementPerPage} 
                isLoading={isLoading} 
                error={error} 
                onDelete={onDeleteHandler} 
                employees={employees}
                numberOfpages={paginatorState.countOfPage}
            />
        </div>;

};

export default Employees;