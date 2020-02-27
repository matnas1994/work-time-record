import React, {useEffect, useState} from 'react';
import { useParams, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import {useHttpClient} from '../../../hooks/http-hook';

import Card from '../../../components/UI/Card/Card';
import Datepicker from '../../../components/UI/FormElements/Datepicker';
import Button from '../../../components/UI/FormElements/Button';
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner';


import PdfWorkTimeRecords from "../../../pdf/WorkTimeRecords";


import './Employee.css';


const Employee = props => {
    const employeeId = useParams().employeeId;
    const [isLoading, error, sendRequest] = useHttpClient();
    const [loadedEmployee, setLoadedEmployee] = useState();
    const [dateWorkTimeRecord, setDateWorkTimeRecord] = useState();
    const [workTimeRecords, setWorkTimeRecords] = useState();

    useEffect(() => {
        const fetchEmployee = async() => {
            try{
                const responseData = await sendRequest('http://localhost:5000/api/employees/'+employeeId);
                setLoadedEmployee(responseData.employee);
                console.log(responseData);
            } catch(err){}
        };
        fetchEmployee();
    }, [employeeId, sendRequest]);

    useEffect(() => {
        if(!dateWorkTimeRecord){
            return; 
        }
        const fetchWorkTimeRecords = async() => {
            try{
                const date = `${dateWorkTimeRecord.year}-${dateWorkTimeRecord.month}`;
                const responseData = await sendRequest(`http://localhost:5000/api/workTimeRecords/?date=${date}&employeeId=${employeeId}`);
                setWorkTimeRecords(responseData.workTimeRecords);
            } catch(err){}
        }
        fetchWorkTimeRecords();
    }, [dateWorkTimeRecord, sendRequest, employeeId, setWorkTimeRecords]);

    const onDateHandler = (month, year) => {
        setDateWorkTimeRecord({month, year});
    }


    if(!loadedEmployee && isLoading && !error){
        return (
            <Card className="employee">
                {isLoading && <LoadingSpinner asOverlay/>}
            </Card>
        )
    }
    
    if((error && error[1] !== 404) || !loadedEmployee){
        return (
            <Card className="employee">
                {error ? <h2>{error}</h2>:
                    <h2>Nie znaleziono pracownika</h2>
                }
            </Card>
        )
    }

    const document = workTimeRecords?.days.length > 0 && !error? <PdfWorkTimeRecords workTimeRecords = {workTimeRecords}/>: null;

    return <Card className="employee">
        <img className="employee__image" src="https://img.icons8.com/clouds/2x/user.png" alt="employee"/>
        <div className="employee-credentials">
            <h2>Imię: {loadedEmployee.name}</h2>
            <h2>Nazwisko: {loadedEmployee.surname}</h2>
            <h2>Stanowisko:{loadedEmployee.position}</h2>
            <NavLink className="employee-credentials__link" to={`/employees/edit/${loadedEmployee.id}`}>
                <FontAwesomeIcon icon={faEdit}/>
            </NavLink>
        </div>
        <div className="employee-workTimeRecord">
            <h2>Ewidencja czasu pracy:</h2>
            <Datepicker onDate={onDateHandler}/>
            {dateWorkTimeRecord &&
            <div className="employee-workTimeRecord__btn-wrapper">
                {isLoading && <LoadingSpinner asOverlay/>}
                {document}
                {!isLoading && error ? 
                    <Button to={`/workTimeRecord/${employeeId}/${dateWorkTimeRecord.year}-${dateWorkTimeRecord.month}`}>Dodaj nową</Button>:
                    <React.Fragment>
                         <Button to={`/workTimeRecord/${employeeId}/${dateWorkTimeRecord.year}-${dateWorkTimeRecord.month}`}>Edytuj</Button>
                    </React.Fragment>
                }
            </div>}
        </div>
    </Card>
}

export default Employee;