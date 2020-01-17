import React from 'react';
import Animes from '../components/anime/Animes';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { AuthContext } from "../components/auth/context/auth";
import { BrowserRouter } from 'react-router-dom';

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

const animes = [
    {
        id: 207,
        attributes: {
            titles: {
                en_jp: 'Cardcaptor Sakura'
            },
            synopsis: 'Magical girl in a magical world',
            posterImage: {
                small: 'cuteSakura.png'
            }
        },
    },
    {
        id: 208,
        attributes: {
            titles: {
                en_jp: 'Pokemon'
            },
            synopsis: 'Pika pi',
            posterImage: {
                small: 'pikachu.png'
            }
        },
    }
];

it("renders the animes list", () => {
    const addItem = jest.fn();

    act(() => {
        render(<BrowserRouter><AuthContext.Provider value={addItem}>
            <Animes testAnimes={animes}/>
        </AuthContext.Provider></BrowserRouter>
        , container);
    });
    expect(container.hasChildNodes()).toBe(true);
    expect(container.textContent).toEqual(expect.stringContaining("Cardcaptor Sakura"));
    expect(container.textContent).toEqual(expect.stringContaining("Magical girl in a magical world"));
    expect(container.textContent).toEqual(expect.stringContaining("Pokemon"));
    expect(container.textContent).toEqual(expect.stringContaining("Pika pi"));
});

it("renders the empty animes list", () => {
    const addItem = jest.fn();

    act(() => {
        render(<AuthContext.Provider value={addItem}>
            <Animes testUsers={null}/>
        </AuthContext.Provider>
        , container);
    });
    expect(container.hasChildNodes()).toBe(true);
});