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
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests?myRequests=true`, {
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
}

export default RequestsApi;