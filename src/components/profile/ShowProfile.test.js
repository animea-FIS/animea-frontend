import React from 'react';
import ShowProfile from './ShowProfile';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { AuthContext } from "../auth/context/auth";

let container = document.createElement("div");

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});
const profile = {
    "id": "5df9cfb41c9d44000047b034",
    "name": "Antonio",
    "username": "Antrodart19",
    "email": "antrodart@mail.com",
    "location": "Sevilla",
    "birthdate": "1996-11-07",
    "bio": "Me encanta ir al mangafest",
    "presentationVideo": "https://www.youtube.com/watch?v=OYlzcXA3LxI",
    "profilePic": "https://www.art-madrid.com/image/cPsf44XRNuGPskHnm/0/luz-imagen-sonido-festival-mira-son.jpg",
    "ratings": [
        {
            "value": "1",
            "rater_user_id": "5df9cfb41c9d44000047b035"
        }
    ],
    "rating": "1",
    "joined_meetings": [
        "5e07be8b1c9d4400001ced56",
        "5e07b8e31c9d4400001ced4e",
        "5e07bc821c9d4400001ced52"
    ]
};

it("renders the profile", () => {
    const addItem = jest.fn()
    act(() => {
        render(<AuthContext.Provider value={addItem}>
        <ShowProfile profile={profile} key={profile.username} context={{'userId': profile.id}}/>
        </AuthContext.Provider>
        , container);
    });
    expect(container.hasChildNodes()).toBe(true);
    expect(container.textContent).toEqual(expect.stringContaining("Antonio"));
    expect(container.textContent).toEqual(expect.stringContaining("Antrodart19"));
    expect(container.textContent).toEqual(expect.stringContaining("antrodart@mail.com"));
});
