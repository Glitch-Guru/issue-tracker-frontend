import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IssueTrackerClientContext } from './index';

function TicketDetails() {
    const { id } = useParams();
    const client = useContext(IssueTrackerClientContext);
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);


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



    const handleDeleteTicket = (event) => {
        client.deleteTicket(id)
            .then(() => {
                alert("Ticket deleted successfully");
                navigate('/tickets');
            })
            .catch((error) => console.error('Error while deleting the ticket.', error));
    };

    const handleListOfTickets = (event) => {
        navigate('/tickets');
    };

    const handleEditTicket = (event) => {
        navigate(`/edit_ticket/${id}`);
    };
    return (
        <div>
            <h2>Ticket</h2>
            {ticket !== null ? (
                <div>
                    <h3>{ticket.title}</h3>
                    <p>Description: {ticket.description}</p>
                    <p>Status: {ticket.status}

                    </p>

                    <p>Assignee ID: {ticket.assigneeId}</p>
                </div>
            ) : (
                <p>No tickets found.</p>
            )}
            <button onClick={handleEditTicket}>Edit ticket</button>
            <button onClick={handleDeleteTicket}>Delete Ticket</button>
            <button onClick={handleListOfTickets}>See the list of tickets</button>

        </div>
    );
}

export default TicketDetails;
