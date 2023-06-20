import React from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Registration from './Registration';
import Logging from "./Logging";
import CreateTicket from "./CreateTicket";
import Tickets from "./Tickets";
import TicketDetails from "./TicketDetails";


function NavigationButtons(){
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
function App() {


    return (

        <Router>
            <div className="App">
                <NavigationButtons />
                <Routes>
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Logging />} />
                    <Route path="/createticket" element={<CreateTicket/>} />
                    <Route path="/tickets" element={<Tickets/>} />
                    <Route path="/tickets/:id" element={<TicketDetails/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
