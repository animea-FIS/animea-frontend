class AnimesApi {
    static API_BASE_URL = `http://localhost:3001/api/v1`

    static requestHeaders() {
        return {}
    }

    static tokenRequestHeaders(userToken) {
        return {
            'x-access-token': userToken,
            'Content-type': 'application/json'
        }
    }

    static getAllAnimes(pageNumber, genre, status, searchText) {
        const headers = this.requestHeaders();
        var baseUrl = AnimesApi.API_BASE_URL + `/animes?page=${pageNumber}`;

        if (genre) {
            baseUrl += `&genre=${genre}`
        }
        if (status) {
            baseUrl += `&status=${status}`
        }
        if (searchText) {
            baseUrl += `&text=${searchText}`
        }

        const request = new Request(baseUrl, {
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
                throw {status: response.status, statusText: response.statusText};
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
            return response.json();
        });
    }

    static addAnimeToUserList(animeId, userId, userToken) {
        const headers = this.tokenRequestHeaders(userToken);
        const request = new Request(AnimesApi.API_BASE_URL + `/user/animes/${animeId}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                user_id: userId,
            })
        });

        return fetch(request).then(response => {
            if(response.status != 201){
               throw {status: response.status, statusText: response.statusText};
            }
        });
    }

    static removeAnimeFromList(animeId, userId, userToken) {
        const headers = this.tokenRequestHeaders(userToken);
        const request = new Request(AnimesApi.API_BASE_URL + `/user/animes/${animeId}`, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify({
                user_id: userId,
            })
        });

        return fetch(request).then(response => {
            if(response.status != 200){
                throw {status: response.status, statusText: response.statusText};
             }
        });
    }

    static updateAnimeFromList(anime, userId, userToken) {
        const request = new Request(AnimesApi.API_BASE_URL + `/user/animes/${anime.anime_id}`, {
            method: 'PUT',
            headers: this.tokenRequestHeaders(userToken),
            body: JSON.stringify({
                rating: anime.rating,
                status: anime.status,
                user_id: userId
            })
        });

        return fetch(request).then(response => {
            if(response.status != 200){
                throw {status: response.status, statusText: response.statusText};
             }
        });
    }
}

export default AnimesApi;