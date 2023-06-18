import React, {useContext, useState} from 'react';
import {IssueTrackerClientContext} from "./index";


function CreateTicket() {

    const client = useContext(IssueTrackerClientContext);
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
            .then(() => alert("Ticket created successfully"));
    };
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
                    <input type="text" value={status} onChange={handleStatus}/>
                </label>
                <br/>
                <label>
                    Assigned to:
                    <input type="number" value={assigneeId} onChange={handleAssigneeId}/>
                </label>
                <br/>
                <button type="submit">Create ticket</button>
            </form>
        </div>
    );
}

export default CreateTicket;
