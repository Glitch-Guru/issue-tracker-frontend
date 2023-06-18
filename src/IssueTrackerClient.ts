import {getCookie, setCookie} from "./utils";

class Ticket {
    constructor(param: {
        id?: number,
        description?: string;
        title?: string;
        status?: string;
        assigneeId?: number;
        reporterId?: number
    }) {
        this.id = param.id
        this.title = param.title
        this.description = param.description
        this.status = param.status
        this.assigneeId = param.assigneeId
        this.reporterId = param.reporterId
    }

    id: number
    title: string
    description: string
    status: string
    assigneeId: number
    reporterId: number

    toJSON() {
        let obj: Ticket = new Ticket({});

        if (this.id != null) {
            obj["id"] = this.id
        }
        if (this.title != null) {
            obj["title"] = this.title
        }
        if (this.description != null) {
            obj["description"] = this.description
        }
        if (this.status != null) {
            obj["status"] = this.status
        }
        if (this.assigneeId != null) {
            obj["assigneeId"] = this.assigneeId
        }
        if (this.reporterId != null) {
            obj["reporterId"] = this.reporterId
        }
        console.log(obj)
        return obj
    }
}

export default class IssueTrackerClient {

    token: String = ""
    url: String = ""

    constructor(url = "") {
        this.url = url;
        this.token = getCookie("token")
    }

    addTicket(data: Ticket) {
        return fetch(`${this.url}/api/v1/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((json) => new Ticket(json))
            .catch((error) => {
                console.error(error);
            })
    }

    login(data: { email: string, password: string }) {
        return fetch(`${this.url}/api/v1/auth/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data != null) {
                    this.handleNewToken(data.token)
                }
            })
            .then(() => this.isLoggedIn())
    }

    register(data: { firstName: string, lastName: string, email: string, password: string }) {
        return fetch(`${this.url}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data != null) {
                    this.handleNewToken(data.token)
                }
            })
            .then(() => this.isLoggedIn())
            .catch((error) => {
                console.error(error);
            });
    }

    getTickets() {
        return fetch(`${this.url}/api/v1/tickets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
        })
            .then((response) => response.json())
            .then((data) => data as Ticket[])
            .catch((error) => {
                console.error(error);
            })
    }

    getTicket(id: number) {
        return fetch(`${this.url}/api/v1/tickets/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
        })
            .then((response) => response.json())
            .then((json) => json as Ticket)
            .catch((error) => {
                console.error(error);
            })
    }

    updateTicket(id: number, data: Ticket) {
        return fetch(`${this.url}/api/v1/tickets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
            body: JSON.stringify(data)
        })
    }

    deleteTicket(id: number) {
        return fetch(`${this.url}/api/v1/tickets/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
        })
    }

    isLoggedIn(): boolean {
        return this.token != null && this.token != "";
    }

    private handleNewToken(token: string) {
        if (token != null) {
            setCookie("token", token)
            this.token = token
        }
    }

}
