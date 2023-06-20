import React, {useContext, useState} from 'react';
import {IssueTrackerClientContext} from "./index";
import {useNavigate} from "react-router-dom";


function CreateTicket() {

    const client = useContext(IssueTrackerClientContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [assigneeId, setAssigneeId] = useState('');


    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleAssigneeId = (e) => {
        setAssigneeId(e.target.value);
    };
    // Event handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        client.addTicket({ title, description, status, assigneeId })
            .then(() => {
                alert("Ticket created successfully");
                navigate('/tickets');
            });
    };

    const handleListOfTickets = (e) => {
        navigate('/tickets');
    }
    return (
        <div>
            <h2>Create ticket</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={handleTitle}/>
                </label>
                <br/>
                <label>
                    Description:
                    <input type="text" value={description} onChange={handleDescription}/>
                </label>
                <br/>
                <label>
                    Status:
                    <select value={status} onChange={handleStatus}>
                        <option value="">Select status</option>
                        <option value="New">New</option>
                        <option value="Approved">Approved</option>
                        <option value="In progress">In progress</option>
                        <option value="in test">In test</option>
                        <option value="closed">Closed</option>
                    </select>
                </label>
                <br/>
                <label>
                    Assigned to:
                    <input type="number" value={assigneeId} onChange={handleAssigneeId}/>
                </label>
                <br/>
                <button type="submit">Create ticket</button>
            </form>
            <button onClick={handleListOfTickets}>See the list of tickets</button>
        </div>
    );
}

export default CreateTicket;
