import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import IssueTrackerClient from "./IssueTrackerClient";

const root = ReactDOM.createRoot(document.getElementById('root'));

export const IssueTrackerClientContext = createContext();
const issueTrackerClient = new IssueTrackerClient("http://localhost:8080");

root.render(
    <IssueTrackerClientContext.Provider value={issueTrackerClient}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </IssueTrackerClientContext.Provider>
);
