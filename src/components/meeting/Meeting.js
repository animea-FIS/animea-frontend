import React from 'react';

function Meeting(props) {
    return(
        <div>
            <h2>Meeting Info:</h2>
            <div>Name: {props.value.name}</div>
            <div>Description: {props.value.description}</div>
            <div>Address: {props.value.address}</div>
            <div>Province: {props.value.province}</div>
            <div>Postal Code: {props.value.postalCode}</div>
            <div>Starting Date: {props.value.startingDate}</div>
            <div>Ending Date: {props.value.endingDate}</div>
            <div>Capacity: {props.value.capacity}</div>
        </div>
    );
}

export default Meeting;