import React from 'react';
import AnimeInfo from '../components/anime/AnimeInfo';
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

it("renders AnimeInfo component fine", () => {
    const fakeAnime = {
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
    };
    const addItem = jest.fn();

    act(() => {
        render(<BrowserRouter><AuthContext.Provider value={addItem}><AnimeInfo testAnime={fakeAnime} />
        </AuthContext.Provider></BrowserRouter>, container);
    });
    expect(container.hasChildNodes()).toBe(true);
    expect(container.textContent).toEqual(expect.stringContaining("Cardcaptor Sakura"));
    expect(container.textContent).toEqual(expect.stringContaining("Magical girl in a magical world"));
})

it("sends event if button to add anime is clicked", async () => {
    const fakeAnime = {
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
        userHasAnime: true
    };
    const onEdit = jest.fn();
    const addItem = jest.fn()
      act(() => {
        render(
            <AuthContext.Provider value={addItem}>
                <BrowserRouter><AnimeInfo testAnime={fakeAnime} /></BrowserRouter>
            </AuthContext.Provider>, container);
      });
    const button = document.querySelector("#addAnime");
    act(() => {
        button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });

    expect(onEdit).toHaveBeenCalledTimes(0);
})