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
        return fetch(request).then(response => {
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

    static addRatingToUser(userRated, userRating, value){
        const bodyRequest = {
            "my_id": userRating,
            "rating_value": value
        };
        return fetch(ProfilesApi.API_BASE_URL + '/rating/profile/' + userRated, {
            method: 'PUT',
            body: JSON.stringify(bodyRequest),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
            return res;
        }).catch(err => {
            console.log(err);
        })
    }

    static updateProfile(profile){
        let video_url = profile.presentationVideo + "";
        if(video_url.length > 11){
            video_url = video_url.split("v=")[1].substring(0,11)
        }
        profile.presentationVideo = video_url;
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