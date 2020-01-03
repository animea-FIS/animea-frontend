class MeetingsApi {
    static API_BASE_URL = "http://localhost:3005/api/v1";

    static requestHeaders() {
        return {}
    }

    static getAllMeetings(pageNumber, province, searchQuery) {

        var getAllUrl = `/meetings?page=${pageNumber}`

        if (province && province != "") {
            getAllUrl = getAllUrl + `&province=${province}`
        }

        if (searchQuery && searchQuery != "") {
            getAllUrl = getAllUrl + `&searchQuery=${searchQuery}`
        }

        const headers = this.requestHeaders();
        const request = new Request(MeetingsApi.API_BASE_URL + getAllUrl, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static getMeetingById(meetingId) {
        const headers = this.requestHeaders();
        const request = new Request(MeetingsApi.API_BASE_URL + `/meetings/${meetingId}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        })
    }
}

export default MeetingsApi;