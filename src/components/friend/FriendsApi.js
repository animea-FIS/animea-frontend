class FriendsApi {
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

    static getAllFriends(userId, userToken) {
        const headers = this.tokenRequestHeaders(userId, userToken);
        const request = new Request(FriendsApi.API_BASE_URL + `/users/${userId}/friends`, {
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

    static getFriendsAnimes(userId, userToken) {
        const headers = this.tokenRequestHeaders(userId, userToken);
        const request = new Request(FriendsApi.API_BASE_URL + `/users/${userId}/friends/animes`, {
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

    static removeFriend(userId, friendId, userToken) {
        const headers = this.tokenRequestHeaders(userId, userToken);
        const request = new Request(FriendsApi.API_BASE_URL + `/users/${userId}/friends/${friendId}`, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
        });
    }

    static removeAllFriends(userId, userToken) {
        const headers = this.tokenRequestHeaders(userId, userToken);
        const request = new Request(FriendsApi.API_BASE_URL + `/users/${userId}/friends`, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
        });
    }
}

export default FriendsApi;