class FriendsApi {
    static API_BASE_URL = "http://localhost:3003" // "/api/v1";

    static requestHeaders() {
        return {}
    }

    static getAllFriends(userId) {
        const headers = this.requestHeaders();
        const request = new Request(FriendsApi.API_BASE_URL + `/users/${userId}/friends`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
            return response.json();
        });
    }

    static removeFriend(userId, friendId) {
        const headers = this.requestHeaders();
        const request = new Request(FriendsApi.API_BASE_URL + `/users/${userId}/friends/${friendId}`, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
        });
    }

    static removeAllFriends(userId) {
        const headers = this.requestHeaders();
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