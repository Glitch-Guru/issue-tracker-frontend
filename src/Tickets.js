import React, { useContext, useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { IssueTrackerClientContext } from './index';

function Tickets() {
    const client = useContext(IssueTrackerClientContext);
    const navigate = useNavigate();
    const [tickets, setTickets] = useState(null);

    useEffect(() => {
        fetchTickets();
    });

    const fetchTickets = () => {
        client.getTickets()
            .then((response) => {
                const ticketData = response;

                setTickets(ticketData);
            })
            .catch((error) => {
                console.error('Error while getting list of tickets.', error);
            });
    };

    const handleCreateTicket =  (event) =>{
        navigate('/createTicket');
    }

    return (
        <div class="center">
            <h2 class="title">Tickets</h2>
            <button class="button" onClick={handleCreateTicket}>Create new ticket</button>
            {tickets !== null ? (
                tickets.length > 0 ? (
                    <ul class="ticket-list">
                        {tickets.map((ticket, index) => (
                            <li class = "ticket" key={index}>
                                <Link to={`/tickets/${ticket.id}`}>
                                    <h3>{ticket.title}</h3>
                                </Link>
                                <p>Description: {ticket.description}</p>
                                <p>Status: {ticket.status}</p>
                                <p>Assignee ID: {ticket.assigneeId}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tickets found.</p>
                )
            ) : (
                <p>Loading tickets...</p>
            )}
        </div>
    );
}

export default Tickets;