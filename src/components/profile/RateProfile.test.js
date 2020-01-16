import React from 'react';
import RateProfile from './RateProfile';
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

it("renders the rate profile component", () => {
    act(() => {
        render(<RateProfile ratingValue={3} key={profile.username} onSaveRate={jest.fn()} onCancelRate={jest.fn()}/>, container);
    });
    expect(container.hasChildNodes()).toBe(true);
    expect(container.textContent).toEqual(expect.stringContaining("1"));
    expect(container.textContent).toEqual(expect.stringContaining("2"));
    expect(container.textContent).toEqual(expect.stringContaining("3"));
    expect(container.textContent).toEqual(expect.stringContaining("4"));
    expect(container.textContent).toEqual(expect.stringContaining("5"));
    expect(container.textContent).toEqual(expect.stringContaining("Rate"));
    expect(container.textContent).toEqual(expect.stringContaining("Cancel"));
});

it("sends event if cancel button is clicked", () => {
    const onCancelRate = jest.fn();
    act(() => {
        render(<RateProfile ratingValue={3} key={profile.username} onSaveRate={jest.fn()} onCancelRate={onCancelRate}/>, container);
    });

    const button = document.querySelector("[data-testid=cancel]");

    act(() => {
        button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });

    expect(onCancelRate).toHaveBeenCalledTimes(1);
});

it("sends event if save button is clicked", () => {
    const onSaveRate = jest.fn();
    act(() => {
        render(<RateProfile ratingValue={3} key={profile.username} onSaveRate={onSaveRate} onCancelRate={jest.fn()}/>, container);
    });

    const button = document.querySelector("[data-testid=save]");

    act(() => {
        button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });

    expect(onSaveRate).toHaveBeenCalledTimes(1);
});