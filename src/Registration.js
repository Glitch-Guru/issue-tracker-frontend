import React, {useContext, useState} from 'react';
import {IssueTrackerClientContext} from "./index";
import {useNavigate} from "react-router-dom";
import './styles.css';
function Registration() {

    const client = useContext(IssueTrackerClientContext);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        client.register({ firstName, lastName, email, password })
            .then(() => {
                alert("Registered successfully");
                navigate('/login');
            })
            .catch((error) =>
                alert("User with this email exists.")
            );

    };

    return (
        <div class="center">
            <div class="div">
            <h2 class="title">Register user</h2>
            </div>
            <div class="div">
            <form onSubmit={handleSubmit}>
                <label class="form">
                    First Name:
                    <input type="text" value={firstName} onChange={handleFirstNameChange}/>
                </label>
                <br/>
                <label class="form">
                    Last Name:
                    <input type="text" value={lastName} onChange={handleLastNameChange}/>
                </label>
                <br/>
                <label class="form">
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange}/>
                </label>
                <br/>
                <label class="form">
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange}/>
                </label>
                <br/>
                <button class="button" type="submit">Register</button>
            </form>
            </div>
        </div>
    );
}

export default Registration;

