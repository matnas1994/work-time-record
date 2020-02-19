import React,{ useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {useHttpClient} from '../../../hooks/http-hook';
import {useForm} from '../../../hooks/form-hook';
import {VALIDATOR_REQUIRE} from '../../../util/validators';


import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/FormElements/Input';
import Button from '../../../components/UI/FormElements/Button';
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner';

import './UpdateEmployee.css';

const NewEmployee = props => {
 const [loadedEmployee, setLoadedEmployee] = useState();
 const [isLoading, error, sendRequest] = useHttpClient();
 const [formState, inputHandler, setFormData] = useForm({
    name: {
        value: '',
        isValid: false
    },
    surname: {
        value: '',
        isValid: false
    },
    position: {
        value: '',
        isValid: false
    }
}, false);



const employeeId = useParams().employeeId;

const history = useHistory();

useEffect(() => {
    const fetchEmployee = async() => {
        try{
            const responseData = await sendRequest('http://localhost:5000/api/employees/'+employeeId);
            setLoadedEmployee(responseData.employee);
            setFormData({
                name: {
                    value: responseData.employee.name,
                    isValid: true
                },
                surname: {
                    value: responseData.employee.surname,
                    isValid: true
                },
                position: {
                    value: responseData.employee.position,
                    isValid: true
                }
            }, true);
        } catch(err){}
    };
    fetchEmployee();
}, [sendRequest, setFormData, employeeId]);

const employeeUpdateSubmitHandler = async event => {
    event.preventDefault();
    try{
        const newEmployee = {
            name: formState.inputs.name.value,
            surname: formState.inputs.surname.value,
            position: formState.inputs.position.value
        }
        await sendRequest('http://localhost:5000/api/employees/'+employeeId ,'PATCH', newEmployee);
        history.push('/employees/'+employeeId);
    }catch(err){
    }
};

if(!loadedEmployee || error){
    return (
        <Card className="updateEmployee">
            <h2>Nie znaleziono pracownika</h2>
        </Card>
    )
}

return (<Card className="updateEmployee">
        <form onSubmit={employeeUpdateSubmitHandler}>
            <Input 
                id="name"
                type="text"
                element="input" 
                label="Imie" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Pole imie nie może być puste"
                onInput={inputHandler}
                initialValue={loadedEmployee.name}
                initialValid={true}
            />
             <Input 
                id="surname"
                type="text"
                element="input" 
                label="Nazwisko" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Pole nazwisko nie może być puste."
                onInput={inputHandler}
                initialValue={loadedEmployee.surname}
                initialValid={true}
            />
            <Input 
                id="position"
                type="text"
                element="input" 
                label="Stanowsko" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Pole stanowisko nie może być puste."
                onInput={inputHandler}
                initialValue={loadedEmployee.position}
                initialValid={true}
            />  
            <Button type="submit" disabled={!formState.isValid} center>
                ZMIEŃ PRACOWNIKA
            </Button>
        </form>
        {isLoading && <LoadingSpinner asOverlay/>}
        {error && <p className="authentication-error">{error}</p>}
</Card>);
}

export default NewEmployee;