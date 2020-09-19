import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../FormElements/LoadingSpinner';
import FinalPage from './finalPage';

import '../FormElements/Card.css';

const Auth = () => {
    const [isComplete, setIsComplete] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValidUser, setIsValidUser] = useState(false);

    const textChangeHandler = event => {
      setUsername(event.target.value);
    };
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        const authConfirmReady = async () => {
            setIsLoading(true);
        
            try {
                var proxyUrl = 'https://myaccount.mcsnet.ca/curitiba.php?ruready=something';
                const response = await fetch(proxyUrl, {
                    method: 'GET',
                });

                const responseData = await response.json();
        
                if (!response.ok) {
                throw new Error(responseData.message);
                } 

                if (responseData.response === "imready"){
                    setIsReady(true);
                }
                //test loading
                // let wait = async (milliseconds = 200) => {
                //     await this.sleep(milliseconds);
                //     setIsLoading(false);
                // };
                setIsLoading(false);
                
            } catch (err) {
                setIsLoading(false);
                throw err;
            }
        };
        authConfirmReady();
    }, []);

    const authSubmitHandler = async (event) => {
        event.preventDefault()
        setIsLoading(true);
        console.log(username);
        try {
            const response = await fetch('https://myaccount.mcsnet.ca/curitiba.php', {
            method:'POST',
            body:  JSON.stringify({"username": username}),
            headers: {'Content-Type': 'application/json'}
            });
    
            const responseData = await response.json();
            if (!response.ok) {
            throw new Error(responseData.message);
            } 

            if (responseData.response === "good"){    
              setIsValidUser(true);
            } 
            setIsComplete(true);
            setIsLoading(false);
            
        } catch (err) {
            setIsLoading(false);
            throw err;
        }
    }

    if (isReady && !isComplete) {
        return (
            <div className='card'>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login</h2>
                <form onSubmit={authSubmitHandler}>
                    <label for="username">username: </label>
                    <input type="text" value={username} onChange={textChangeHandler} id="username"></input><br></br>
                    <button className="button" type="submit" id>Submit</button>
                </form>   
            </div>
        );
    } else if (!isReady && !isComplete) {
        return (
            
            <div className='card'>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Error</h2>  
            </div>
        );
    } else {
        return(
            <div className='card'>
                {isLoading && <LoadingSpinner asOverlay />}
                <FinalPage isValidUser={isValidUser}/>
            </div>
        );
    }
};

export default Auth;