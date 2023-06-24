import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IssueTrackerClientContext } from './index';

function EditTickets(){
    const { id } = useParams();
    const client = useContext(IssueTrackerClientContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [assigneeId, setAssigneeId] = useState('');

    useEffect(() => {
        fetchTicket();
    }, []);

    const fetchTicket = () => {
        client.getTicket(id)
            .then((response) => {
                const ticketDetails = response;
                setTitle(ticketDetails.title);
                setDescription(ticketDetails.description);
                setStatus(ticketDetails.status);
                setAssigneeId(ticketDetails.assigneeId);
            })
            .catch((error) => {
                console.error('Error while getting details of the ticket.', error);
            });
    };


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

    const handleUpdateTicket = (event) => {
        event.preventDefault();
        const updatedTicket = {
            title: title,
            description: description,
            assigneeId: assigneeId,
            status: status
        };

        client.updateTicket(id, updatedTicket)
            .then(() => {
                alert("Ticket updated successfully");
                navigate(`/tickets/${id}`);
            })
            .catch((error) => console.error('Error while updating the ticket.', error));
    };

    const handleDeleteTicket = (event) => {
        client.deleteTicket(id)
            .then(() => {
                alert("Ticket deleted successfully");
                navigate('/tickets');
            })
            .catch((error) => console.error('Error while deleting the ticket.', error));
    };

    const handleCancelation = (event) => {
        navigate( `/tickets/${id}`);
    }

    return (
        <div class="center">
            <h2 class="title">Edit ticket</h2>
            <form onSubmit={handleUpdateTicket}>
                <label class="form">
                    Title:
                    <input type="text" value={title} onChange={handleTitle}/>
                </label>
                <br/>
                <label class="form">
                    Description:
                    <input type="text" value={description} onChange={handleDescription}/>
                </label>
                <br/>
                <label class="form">
                    Status:
                    <select value={status} onChange={handleStatus}>
                        <option value="Approved">Approved</option>
                        <option value="In progress">In progress</option>
                        <option value="In test">In test</option>
                        <option value="Closed">Closed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </label>
                <br/>
                <label class="form">
                    Assigned to:
                    <input type="number" value={assigneeId} onChange={handleAssigneeId}/>
                </label>
                <br/>
                <button class="button" type="submit">Update ticket</button>
            </form>

            <button class="button" onClick={handleDeleteTicket}>Delete Ticket</button>
            <button class="button" onClick={handleCancelation}>Cancel changes</button>

        </div>
    );
}

export default EditTickets;