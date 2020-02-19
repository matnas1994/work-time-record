import React from 'react';
import { useHistory } from 'react-router-dom';

import {useHttpClient} from '../../../hooks/http-hook';
import {useForm} from '../../../hooks/form-hook';
import {VALIDATOR_REQUIRE} from '../../../util/validators';


import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/FormElements/Input';
import Button from '../../../components/UI/FormElements/Button';
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner';

import './NewEmployee.css';

const NewEmployee = props => {
 const [isLoading, error, sendRequest] = useHttpClient();
 const [formState, inputHandler] = useForm({
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

const history = useHistory();

const employeeSubmitHandler = async event => {
    event.preventDefault();
    try{
        const newEmployee = {
            name: formState.inputs.name.value,
            surname: formState.inputs.surname.value,
            position: formState.inputs.position.value
        }
        await sendRequest('http://localhost:5000/api/employees' ,'POST', newEmployee);
        history.push('/');
    }catch(err){
    }
};

return (<Card className="newEmployee">
        <form onSubmit={employeeSubmitHandler}>
            <Input 
                id="name"
                type="text"
                element="input" 
                label="Imie" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Pole imie nie może być puste"
                onInput={inputHandler}
            />
             <Input 
                id="surname"
                type="text"
                element="input" 
                label="Nazwisko" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Pole nazwisko nie może być puste."
                onInput={inputHandler}
            />
            <Input 
                id="position"
                type="text"
                element="input" 
                label="Stanowsko" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Pole stanowisko nie może być puste."
                onInput={inputHandler}
            />  
            <Button type="submit" disabled={!formState.isValid} center>
                DODAJ PRACOWNIKA
            </Button>
        </form>
        {isLoading && <LoadingSpinner asOverlay/>}
        {error && <p className="authentication-error">{error}</p>}
</Card>);
}

export default NewEmployee;