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

    static getUserAnimes(userId) {
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
    

    static updateAnimeFromList(anime) {
        console.log(anime);
        const request = new Request(AnimesApi.API_BASE_URL + `/user/animes/${anime.anime_id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                rating: anime.rating,
                status: anime.status
            })
        });

        return fetch(request).then(response => {
            console.log(response);
        });
    }
}

export default AnimesApi;