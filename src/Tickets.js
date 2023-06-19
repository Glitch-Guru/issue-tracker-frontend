import React, { useContext, useEffect, useState } from 'react';
import { IssueTrackerClientContext } from './index';

function Tickets() {
    const client = useContext(IssueTrackerClientContext);
    const [tickets, setTickets] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = () => {
        client.getTickets()
            .then((response) => {
                const ticketData = response; // Assuming response is the array of tickets

                console.log(ticketData); // Log the ticketData to verify its value

                setTickets(ticketData);
            })
            .catch((error) => {
                console.error('Error while getting list of tickets.', error);
            });
    };

    console.log(tickets); // Log the value of the tickets array


    return (
        <div>
            <h2>Tickets</h2>
            {tickets !== null ? (
                tickets.length > 0 ? (
                    <ul>
                        {tickets.map((ticket, index) => (
                            <li key={index}>
                                <h3>{ticket.title}</h3>
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