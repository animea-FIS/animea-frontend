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

    static createMeeting(name, description, address, postal_code, province, capacity, starting_date, starting_time, ending_date, ending_time, userToken) {

        var startingDate = null;
        var endingDate = null;

        if (starting_date.toString() != "" && starting_time.toString() != "") {
            startingDate = starting_date + "T" + starting_time + ":00.000Z";
        }

        if (ending_date != "" && ending_time != "") {
            endingDate = ending_date + "T" + ending_time + ":00.000Z";
        }

        const request = new Request(MeetingsApi.API_BASE_URL + `/meetings/`, {
            method: 'POST',
            headers: {
                "x-access-token": userToken,
                'Content-Type': 'application/json',
            },    

            body: JSON.stringify({
                name: name,
                description: description,
                address: address,
                province: province,
                postalCode: postal_code,
                startingDate: startingDate,
                endingDate: endingDate,
                capacity: capacity
            })
        });

        return fetch(request).then(response => {
            console.log(response);
            return response.json();
        });
    }

    static updateMeeting(meetingId, name, description, address, postal_code, province, capacity, starting_date, starting_time, ending_date, ending_time, userToken) {

        const request = new Request(MeetingsApi.API_BASE_URL + `/meetings/${meetingId}`, {
            method: 'PUT',
            headers: {
                "x-access-token": userToken,
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

    static joinMeeting(meetingId, userToken) {
        const request = new Request(MeetingsApi.API_BASE_URL + `/meetings/join/${meetingId}`, {
            method: 'POST',
            headers: {
                "x-access-token": userToken
            }
        });

        return fetch(request).then(response => {
            console.log(response);
            return response.json();
        })
    }

    static deleteMeeting(meetingId, userToken) {
        const request = new Request(MeetingsApi.API_BASE_URL + `/meetings/${meetingId}`, {
            method: 'DELETE',
            headers: {
                "x-access-token": userToken
            }
        });

        return fetch(request).then(response => {
            console.log(response);
            return response.json();
        })
    }

    static leaveMeeting(meetingId, userToken) {
        const request = new Request(MeetingsApi.API_BASE_URL + `/meetings/leave/${meetingId}`, {
            method: 'DELETE',
            headers: {
                "x-access-token": userToken
            }
        });

        return fetch(request).then(response => {
            console.log(response);
            return response.json();
        })
    }
}

export default MeetingsApi;