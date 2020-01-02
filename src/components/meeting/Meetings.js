import React, { Component } from 'react';
import M from 'materialize-css';


import Meeting from './Meeting';

class Meetings extends Component {
    state = {
        meetings: [
            {
                "members": [
                    "5df9cfb41c9d44000047b034",
                    "5df9cfb41c9d44000047b037",
                    "5df9cfb41c9d44000047b035"
                ],
                "_id": "5e07ba481c9d4400001ced4f",
                "name": "Fullmetal Alchemist: Brotherhood come alive",
                "description": "Brothers Edward and Alphonse Elric are raised by their mother Trisha Elric in the remote village of Resembool in the country of Amestris. Their father Hohenheim, a noted and very gifted alchemist, abandoned his family while the boys were still young, and while in Trisha's care they began to show an affinity for alchemy.",
                "address": "Calle Zabalbide, 27",
                "province": "vizcaya",
                "postalCode": "48006",
                "startingDate": "2020-07-27T15:35:00.000Z",
                "endingDate": "2020-07-27T23:00:00.000Z",
                "capacity": 25,
                "creatorId": "5df9cfb41c9d44000047b037",
                "__v": 0
            }
        ]
    };

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        M.AutoInit();
    };

    render() {
        const listItems = this.state.meetings.map((meeting) => <Meeting key={meeting._id} value={meeting}/>);
        console.log(listItems);

        return (
            <div>
                {listItems}
            </div>
        );
    };
};

export default Meetings; 