import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow, mount, configure } from 'enzyme';
import Anime from '../components/anime/Anime';
import { BrowserRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { AuthContext } from "../components/auth/context/auth";

configure({adapter: new Adapter()});
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

it("renders Anime component fine", () => {
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
    const wrapper = mount(<BrowserRouter><Anime key={fakeAnime.id} value={fakeAnime} /></BrowserRouter>, container);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').prop('src')).toEqual('cuteSakura.png');
    expect(wrapper.find('h5')).toHaveLength(1);
    expect(wrapper.find('h5').text()).toEqual(expect.stringContaining("Cardcaptor Sakura"));
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('p').text()).toEqual(expect.stringContaining("Magical girl in a magical world"));
})

// it("sends event if button to add anime is clicked", async () => {
//     const fakeAnime = {
//         id: 207,
//         attributes: {
//             titles: {
//                 en_jp: 'Cardcaptor Sakura'
//             },
//             synopsis: 'Magical girl in a magical world',
//             posterImage: {
//                 small: 'cuteSakura.png'
//             }
//         },
//     };
//     var authTokens='123';
//     var userId='123';
//     const setTokens = jest.fn();
//     const setId = jest.fn();
//     let spy =  jest.spyOn(Anime.prototype, 'addAnime')
//       .mockImplementation(() => true)
//     const wrapper = mount(
//             <AuthContext.Provider value={{authTokens, setTokens, userId, setId}}>
//                 <BrowserRouter><Anime key={fakeAnime.id} value={fakeAnime} /></BrowserRouter>
//             </AuthContext.Provider>, container);
//     wrapper.find('#addAnime').simulate('click')

//     await expect(spy).toHaveBeenCalledTimes(1);
// })

// it("sends event if button to remove anime is clicked", async () => {
//     const fakeAnime = {
//         id: 207,
//         attributes: {
//             titles: {
//                 en_jp: 'Cardcaptor Sakura'
//             },
//             synopsis: 'Magical girl in a magical world',
//             posterImage: {
//                 small: 'cuteSakura.png'
//             }
//         },
//     };
//     var authTokens='123';
//     var userId='123';
//     const setTokens = jest.fn();
//     const setId = jest.fn();
//     let spy =  jest.spyOn(Anime.prototype, 'removeAnime')
//       .mockImplementation(() => true)
//     const wrapper = mount(
//             <AuthContext.Provider value={{authTokens, setTokens, userId, setId}}>
//                 <BrowserRouter><Anime key={fakeAnime.id} value={fakeAnime} /></BrowserRouter>
//             </AuthContext.Provider>, container);
//     wrapper.find('#removeAnime').simulate('click')

//     await expect(spy).toHaveBeenCalledTimes(1);
// })