class AuthApi {
    // static API_BASE_URL = `http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_GATEWAY_PORT}/api/auth`
    static API_BASE_URL = `https://animea-gateway.herokuapp.com/auth/api/v1/auth`

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
        console.log(request);

        return fetch(request).then(response => {
            return response.json();
        });
    }

}

export default AuthApi;