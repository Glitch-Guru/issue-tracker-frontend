import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IssueTrackerClientContext } from './index';

function TicketDetails() {
    const { id } = useParams();
    const client = useContext(IssueTrackerClientContext);
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [status, setStatus] = useState('');
  

    useEffect(() => {
        fetchTicket();
    });

    const fetchTicket = () => {
        client.getTicket(id)
            .then((response) => {
                const ticketDetails = response;
                setTicket(ticketDetails);
            })
            .catch((error) => {
                console.error('Error while getting details of the ticket.', error);
            });
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleUpdateTicket = (event) => {
        const updatedTicket = {
            title: ticket.title,
            description: ticket.description,
            assigneeId: ticket.assigneeId,
            status: status
        };

        client.updateTicket(id, updatedTicket)
            .then(() => alert("Ticket updated successfully"))
            .catch((error) => console.error('Error while updating the ticket.', error));
    };

    const handleDeleteTicket = (event) => {
        client.deleteTicket(id)
            .then(() => {
                alert("Ticket deleted successfully");
                navigate('/tickets');
            })
            .catch((error) => console.error('Error while deleting the ticket.', error));
    }

    const handleListOfTickets = (event) => {
        navigate('/tickets');
    }
    return (
        <div>
            <h2>Ticket</h2>
            {ticket !== null ? (
                <div>
                    <h3>{ticket.title}</h3>
                    <p>Description: {ticket.description}</p>
                    <p>Status:
                        <select value={status} onChange={handleStatusChange}>
                            <option value="Approved">Approved</option>
                            <option value="In progress">In progress</option>
                            <option value="In test">In test</option>
                            <option value="Closed">Closed</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <button onClick={handleUpdateTicket}>Update Status</button>
                    </p>

                    <p>Assignee ID: {ticket.assigneeId}</p>
                </div>
            ) : (
                <p>No tickets found.</p>
            )}
            <button onClick={handleDeleteTicket}>Delete Ticket</button>
            <button onClick={handleListOfTickets}>See the list of tickets</button>
        </div>
    );
}

export default TicketDetails;
