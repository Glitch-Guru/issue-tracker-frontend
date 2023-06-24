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
        <div class="center">
            <h2 class="title">Ticket</h2>
            {ticket !== null ? (
                <div>
                    <h3 class="title-smaller">{ticket.title}</h3>
                    <p class="text">Description: {ticket.description}</p>
                    <p class="text">Status: {ticket.status}

                    </p>

                    <p class="text">Assignee ID: {ticket.assigneeId}</p>
                </div>
            ) : (
                <p class="text">No tickets found.</p>
            )}
            <button class="button" onClick={handleEditTicket}>Edit ticket</button>
            <button class="button" onClick={handleDeleteTicket}>Delete Ticket</button>
            <button class="button" onClick={handleListOfTickets}>See the list of tickets</button>

        </div>
    );
}

export default TicketDetails;
