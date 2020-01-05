class AnimesApi {
    static API_BASE_URL = `http://localhost:3002/animes/api/v1`

    static requestHeaders() {
        return {}
    }

    static tokenRequestHeaders(userToken) {
        return {
            'x-access-token': userToken
        }
    }

    static getAllAnimes(pageNumber) {
        const headers = this.requestHeaders();
        const request = new Request(AnimesApi.API_BASE_URL + `/animes?page=${pageNumber}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static getAnimeById(animeId) {
        const headers = this.requestHeaders();
        const request = new Request(AnimesApi.API_BASE_URL + `/animes/${animeId}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response)
            return response.json();
        });
    }

    static searchAllAnimes(text) {
        const headers = this.requestHeaders();
        const request = new Request(AnimesApi.API_BASE_URL + `/animes?text=${text}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response)
            return response.json();
        });
    }

    static getUserAnimes(userId, userToken) {
        const headers = this.tokenRequestHeaders(userToken);
        const request = new Request(AnimesApi.API_BASE_URL + `/user/${userId}/animes`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            if(response.status == 200){
            return response.json();
            } else {
                return [];
            }
        });
    }

    static searchUserAnimes(userId) {
        const headers = this.requestHeaders();
        const request = new Request(AnimesApi.API_BASE_URL + `/user/${userId}/animes`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response)
            return response.json();
        });
    }

    static addAnimeToUserList(animeId) {
        const headers = this.requestHeaders();
        const request = new Request(AnimesApi.API_BASE_URL + `/user/animes/${animeId}`, {
            method: 'POST',
            headers: headers
        });

        console.log(request);

        return fetch(request).then(response => {
            console.log(response);
            //return response.json();
        });
    }

    static removeAnimeFromList(animeId) {
        const headers = this.requestHeaders();
        const request = new Request(AnimesApi.API_BASE_URL + `/user/animes/${animeId}`, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
        });
    }
}

export default AnimesApi;