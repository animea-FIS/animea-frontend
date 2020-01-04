class MeetingsApi {
    static API_BASE_URL = "http://localhost:3005/api/v1";

    static requestHeaders() {
        return {}
    }

    static getAllMeetings(pageNumber, province, searchQuery) {

        var getAllUrl = `/meetings?page=${pageNumber}`

        if (province && province !== "") {
            getAllUrl = getAllUrl + `&province=${province}`
        }

        if (searchQuery && searchQuery !== "") {
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

    static createMeeting(name, description, address, postal_code, province, capacity, starting_date, starting_time, ending_date, ending_time) {

        const request = new Request(MeetingsApi.API_BASE_URL + `/meetings/`, {
            method: 'POST',
            headers: {
                // "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDc5YmNmNWJjZjAzMGZkODlmMDg1MCIsImlhdCI6MTU3ODEzOTcxOCwiZXhwIjoxNTc4MjI2MTE4fQ.FnkjnOGruPg_opuEPMOYycJZhMmu0gKI_Vgn2Bh0Et0",
                'Content-Type': 'application/json',
            },    

            body: JSON.stringify({
                name: name,
                description: description,
                address: address,
                province: province,
                postalCode: postal_code,
                startingDate: starting_date + "T" + starting_time + ":00.000Z",
                endingDate: ending_date + "T" + ending_time + ":00.000Z",
                capacity: capacity
            })
        });

        return fetch(request).then(response => {
            console.log(response);
            return response.json();
        });
    }
}

export default MeetingsApi;