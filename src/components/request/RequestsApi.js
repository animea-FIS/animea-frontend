class RequestsApi {
    static API_BASE_URL = "https://animea-gateway.herokuapp.com/friends/api/v1";

    static requestHeaders() {
        return {}
    }

    static tokenRequestHeaders(userId, userToken) {
        return {
            'x-access-token': userToken,
            'x-user-id': userId,
            'Content-type': 'application/json'
        }
    }

    static getCreatedRequests(userId, userToken) {
        const headers = this.tokenRequestHeaders(userId, userToken);
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
            return response.json();
        });
    }

    static getMyRequests(userId, userToken) {
        const headers = this.tokenRequestHeaders(userId, userToken);
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests?received=true`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
            if(response.status == 200){
                return response.json();
            } else {
                throw {status: response.status, statusText: response.statusText};
            }
        });
    }

    static getRequestById(userId, reqId, userToken) {
        const headers = this.tokenRequestHeaders(userId, userToken);
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests/${reqId}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response)
            if(response.status == 200){
                return response.json();
            } else {
                throw {status: response.status, statusText: response.statusText};
            }
        });
    }

    static acceptRequest(userId, reqId, userToken) {
        const headers = this.tokenRequestHeaders(userId, userToken);
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests/${reqId}/accept`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response)
        });
    }

    static removeRequest(userId, reqId, userToken) {
        const headers = this.tokenRequestHeaders(userId, userToken);
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests/${reqId}`, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
        });
    }

    static removeAllRequests(userId, userToken) {
        const headers = this.tokenRequestHeaders(userId, userToken);
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests`, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
        });
    }

    static createRequest(userId, friendId, message, userToken) {
        const headers = this.tokenRequestHeaders(userId, userToken);
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${userId}/requests?noemail=true`, {
            method: 'POST',
            headers: headers,
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

    static updateRequest(prevReq, message, userToken) {
        const headers = this.tokenRequestHeaders(prevReq.userId, userToken);
        const request = new Request(RequestsApi.API_BASE_URL + `/users/${prevReq.userId}/requests/${prevReq.id}`, {
            method: 'PUT',
            headers: headers,
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