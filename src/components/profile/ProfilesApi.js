class ProfilesApi{
    static API_BASE_URL = "http://localhost:3000";
    static API_VERSION = "/api";
    static API_URL = ProfilesApi.API_BASE_URL + ProfilesApi.API_VERSION;

    static requestHeaders() {
        return {}
    }

    static getAllProfiles(){
        const headers = this.requestHeaders();
        const request = new Request(ProfilesApi.API_URL + "/users", {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response)
            return response.json();
        });
    }
}

export default ProfilesApi;