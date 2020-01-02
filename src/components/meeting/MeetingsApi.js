class MeetingsApi {
    static API_BASE_URL = "http://localhost:3005/api/v1";

    static requestHeaders() {
        return {}
    }

    static getAllMeetings(pageNumber, province) {
        const headers = this.requestHeaders();
        const request = new Request(MeetingsApi.API_BASE_URL + `/meetings?page=${pageNumber}&province=${province}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }
}

export default MeetingsApi;