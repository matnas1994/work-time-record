import React, {useContext} from 'react';

import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH} from '../../util/validators';

import {useForm} from '../../hooks/form-hook';
import {useHttpClient} from '../../hooks/http-hook';
import {AuthContext} from '../../context/auth-context';

import Card from '../../components/UI/Card/Card';
import Input from '../../components/UI/FormElements/Input';
import Button from '../../components/UI/FormElements/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';


import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const [isLoading, error, sendRequest, ] = useHttpClient();

    const authSumbitHandler = async event => {
        event.preventDefault();
        try{
            const responseData = await sendRequest('http://localhost:5000/api/users/login', 'POST', {
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
            });
            auth.login(responseData.userId, responseData.token);
        } catch(err){}
    }


    return (
        <Card className="auth">
             <h2 className="authentication-header">PANEL LOGOWANIA</h2>
                <form onSubmit={authSumbitHandler}>
                    <Input 
                        id="email"
                        type="email"
                        element="input" 
                        label="E-mail" 
                        validators={[VALIDATOR_EMAIL()]} 
                        errorText="Wprowadź poprawny adres e-mail."
                        onInput={inputHandler}
                    />
                    <Input 
                        id="password"
                        type="password"
                        element="input" 
                        label="Hasło" 
                        validators={[VALIDATOR_MINLENGTH(6)]} 
                        errorText="Wprowadź poprawne hasło (minimum 6 znaków)."
                        onInput={inputHandler}
                    />  
                    <Button type="submit" disabled={!formState.isValid} center>
                        ZALOGUJ SIE
                    </Button>
                </form>
                {isLoading && <LoadingSpinner asOverlay/>}
                {error && <p className="authentication-error">{error}</p>}
        </Card>);
}

export default Auth;