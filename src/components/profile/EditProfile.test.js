import React from 'react';
import EditProfile from './EditProfile';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { JsxEmit } from 'typescript';

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

it("renders the edit profile view", () => {
    act(() => {
        render(<EditProfile profile={profile} key={profile.username}
            onCancel={jest.fn()} onChange={jest.fn()} onSave={jest.fn()}
            isValid={true} formErrors={{}}/>, container);
    });
    expect(container.hasChildNodes()).toBe(true);
    expect(container.textContent).toEqual(expect.stringContaining("Antrodart19"));
    expect(container.textContent).toEqual(expect.stringContaining("Name:"));
    expect(container.textContent).toEqual(expect.stringContaining("Email:"));
    expect(container.textContent).toEqual(expect.stringContaining("Location:"));
    expect(container.textContent).toEqual(expect.stringContaining("Save"));
    expect(container.textContent).toEqual(expect.stringContaining("Cancel"));
    console.log(container.textContent);
});

it("sends event if cancel button is clicked", () => {
    const onCancel = jest.fn();
    act(() => {
        render(<EditProfile profile={profile} key={profile.username}
            onCancel={onCancel} onChange={jest.fn()} onSave={jest.fn()}
            isValid={true} formErrors={{}}/>, container);
    });

    const button = document.querySelector("[data-testid=cancel]");

    act(() => {
        button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
});

it("sends event if save button is clicked", () => {
    const onSave = jest.fn();
    act(() => {
        render(<EditProfile profile={profile} key={profile.username}
            onCancel={jest.fn()} onChange={jest.fn()} onSave={onSave}
            isValid={true} formErrors={{}}/>, container);
    });

    const button = document.querySelector("[data-testid=save]");

    act(() => {
        button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });

    expect(onSave).toHaveBeenCalledTimes(1);
});