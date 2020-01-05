class RequestsApi {
    static API_BASE_URL = "http://localhost:3003" // "/api/v1";

    static requestHeaders() {
        return {}
    }

    static getCreatedRequests(userId) {
        const headers = this.requestHeaders();
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
            return response.json();
        });
    }

    static getMyRequests(userId) {
        const headers = this.requestHeaders();
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests?received=true`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
            return response.json();
        });
    }

    static getRequestById(userId, reqId) {
        const headers = this.requestHeaders();
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests/${reqId}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response)
            return response.json();
        });
    }

    static acceptRequest(userId, reqId) {
        const headers = this.requestHeaders();
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests/${reqId}/accept`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response)
        });
    }

    static removeRequest(userId, reqId) {
        const headers = this.requestHeaders();
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests/${reqId}`, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
        });
    }

    static removeAllRequests(userId) {
        const headers = this.requestHeaders();
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests`, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
        });
    }

    static createRequest(userId, friendId, message) {
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },    
            body: JSON.stringify({
                userId: userId,
                friendId: friendId,
                message: message
            })
        });

        return fetch(request).then(response => {
            console.log(response);
        });
    }

    static updateRequest(prevReq, message) {
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${prevReq.userId}/requests/${prevReq.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },    
            body: JSON.stringify({
                userId: prevReq.userId,
                friendId: prevReq.friendId,
                message: message
            })
        });

        return fetch(request).then(response => {
            console.log(response);
        });
    }
}

export default RequestsApi;