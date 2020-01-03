class AuthApi {
    static API_BASE_URL = `http://localhost:3001/api/auth`

    static requestHeaders() {
        return {
            'Content-Type': 'application/json'
        }
    }

    static login(email, password) {
        const headers = this.requestHeaders();
        const request = new Request(AuthApi.API_BASE_URL + `/login`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

}

export default AuthApi;