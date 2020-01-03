const axios = require('axios');

class ProfilesApi {
    static API_BASE_URL = "http://localhost:3005/api";

    static requestHeaders() {
        return {}
    }

    static getAllUsers() {
        const headers = this.requestHeaders();
        const request = new Request(ProfilesApi.API_BASE_URL + `/users`, {
            method: 'GET',
            headers: headers
        });
        console.log('request: '+ request);
        return fetch(request).then(response => {
            console.log('Respuesta en el fetch: ' + response);
            return response.json();
        });
    }

    static getUserById(userId) {
        const headers = this.requestHeaders();
        const request = new Request(ProfilesApi.API_BASE_URL + `/profile/${userId}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response);
            return response.json();
        });
    }

    static getRatingByUserId(userId) {
        const headers = this.requestHeaders();
        const request = new Request(ProfilesApi.API_BASE_URL + `/rating/profile/${userId}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response)
            return response.json();
        });
    }

    static getMeetingsByUserId(userId) {
        const headers = this.requestHeaders();
        const request = new Request(ProfilesApi.API_BASE_URL + `/user/${userId}/joinedMeetings`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            console.log(response)
            return response.json();
        });
    }

    static userJoinsMeeting(userId, meetingId) {
        const headers = this.requestHeaders();
        const request = new Request(ProfilesApi.API_BASE_URL + `/user/${userId}/joinsMeeting/${meetingId}`, {
            method: 'PUT',
            headers: headers
        });

        console.log(request);

        return fetch(request).then(response => {
            console.log(response);
            //return response.json();
        })
    }

    static userLeavesMeeting(userId, meetingId) {
        const headers = this.requestHeaders();
        const request = new Request(ProfilesApi.API_BASE_URL + `/user/${userId}/leavesMeeting/${meetingId}`, {
            method: 'PUT',
            headers: headers
        });

        console.log(request);

        return fetch(request).then(response => {
            console.log(response);
            //return response.json();
        })
    }

    //TODO Añadir Rating a usuario

    static updateProfile(profile){
        return fetch(ProfilesApi.API_BASE_URL + '/profile', {
            method: 'PUT',
            body: JSON.stringify(profile),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => {
            console.log(err)
        })
    }
}

export default ProfilesApi;