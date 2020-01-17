import React from 'react';
import Friends from './Friends';
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

const profiles = [
    {
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
    },
    {
        "id": "5df9cfb41c9d44000047b035",
        "name": "Pepe Gotera",
        "username": "pepegot",
        "email": "pepegot@gmail.com",
        "location": "Madrid",
        "birthdate": "1962-05-03",
        "bio": "Me gusta mucho el manga y el anime",
        "presentationVideo": "https://www.youtube.com/watch?v=LUO5qhpD2pA",
        "profilePic": "https://static1.eldiariomontanes.es/www/multimedia/201905/11/media/cortadas/pepegoteras1-kKQH-U80177317922D7D-624x585@Diario%20Montanes.png",
        "ratings": [
        ],
        "rating": "0",
        "joined_meetings": [
            "5e07be8b1c9d4400001ced56", 
            "5e07b8e31c9d4400001ced4e",
            "5e07bc821c9d4400001ced52"
        ]
    }
];

it("renders the profiles list", () => {
    const addItem = jest.fn();

    act(() => {
        render(<AuthContext.Provider value={addItem}>
            <Friends testUsers={profiles}/>
        </AuthContext.Provider>
        , container);
    });
    expect(container.hasChildNodes()).toBe(true);
    expect(container.textContent).toEqual(expect.stringContaining("Antonio"));
    expect(container.textContent).toEqual(expect.stringContaining("Antrodart19"));
    expect(container.textContent).toEqual(expect.stringContaining("antrodart@mail.com"));
    expect(container.textContent).toEqual(expect.stringContaining("Pepe Gotera"));
    expect(container.textContent).toEqual(expect.stringContaining("pepegot"));
    expect(container.textContent).toEqual(expect.stringContaining("pepegot@gmail.com"));
});

it("renders the empty profiles list", () => {
    const addItem = jest.fn();

    act(() => {
        render(<AuthContext.Provider value={addItem}>
            <Friends testUsers={null}/>
        </AuthContext.Provider>
        , container);
    });
    expect(container.hasChildNodes()).toBe(true);
    expect(container.textContent).toEqual(expect.stringContaining("You have no friends"));
});