class AnimesApi {
    static API_BASE_URL = "http://localhost:3001" // "/api/v1";

    static requestHeaders() {
        return {}
    }

    static getAllAnimes(pageNumber) {
        const headers = this.requestHeaders();
        const request = new Request(AnimesApi.API_BASE_URL + `/animes?page=${pageNumber}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response)
            return response.json();
        });
    }

    static searchAnimes(text) {
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

    static addAnimeToUserList(userId, animeId) {
        const headers = this.requestHeaders();
        const request = new Request(AnimesApi.API_BASE_URL + `/user/${userId}/animes/${animeId}`, {
            method: 'POST',
            headers: headers
        });

        console.log(request);

        return fetch(request).then(response => {
            console.log(response);
            //return response.json();
        })
    }

    static removeAnimeFromList(userId, animeId) {
        const headers = this.requestHeaders();
        const request = new Request(AnimesApi.API_BASE_URL + `/user/${userId}/animes/${animeId}`, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
        })
    }
}

export default AnimesApi;