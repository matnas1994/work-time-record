import {useState, useCallback, useRef, useEffect, useContext} from 'react';
import {AuthContext} from '../context/auth-context';

import axios from 'axios';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const auth = useContext(AuthContext);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', data, headers) => {
        setIsLoading(true);
        setError(false);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try{
            const response = await axios({
                method,
                url,
                data,
                headers: {
                    ...headers,
                    Authorization: `Bearer ${auth.token}`
                }
            });

            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCrl => reqCrl !== httpAbortCtrl
            );

            setIsLoading(false);
            return response.data;
        }catch(err){
            if(err.response.status === 403) {
                setError('Nieprawidłowe dane logowania.');
            }else{
                setError(['Oj, coś poszło nie tak... ', err.response.status]);
            }
            setIsLoading(false);
        }
    }, [auth.token]);


    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return [isLoading, error, sendRequest, clearError];
}