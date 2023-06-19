import React, {useContext, useState} from 'react';
import {IssueTrackerClientContext} from "./index";

function Logging(){
    const client = useContext(IssueTrackerClientContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        client.login({ email, password })
            .then(() => alert("Logged in successfully"))
    };
    return (
        <div>
            <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="text" value={email} onChange={handleEmail} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={handlePassword} />
            </label>
            <br />
            <button type="submit">Log in</button>
        </form>
        </div>
    )
}

export default Logging;