// import React from 'react';
// import ReactDOM from 'react-dom';
// import Animes from '../components/anime/Animes';
// import Anime from '../components/anime/Anime';
// import { AuthContext } from "../components/auth/context/auth";
// import { act } from "react-dom/test-utils";
// import { render, unmountComponentAtNode } from "react-dom";
// import { shallow, mount, configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// const nock = require('nock');

// configure({adapter: new Adapter()});
// // it('renders without crashing', () => {
// //     const div = document.createElement('div');
// //     ReactDOM.render(<Animes />, div);
// //     ReactDOM.unmountComponentAtNode(div);
// // });

// // let container = document.createElement("div");
// // beforeEach(() => {
// //     container = document.createElement("div");
// //     document.body.appendChild(container);
// // });

// // afterEach(() => {
// //     unmountComponentAtNode(container);
// //     container.remove();
// //     container = null;
// // });

// const setTokens = jest.fn();
// const setId = jest.fn();

// const fakeAnimes = [{
//   id: 207,
//   attributes: [{
//       titles: {
//           en_jp: 'Cardcaptor Sakura'
//       },
//       synopsis: 'Magical girl in a magical world'
//   },
//   {
//     id: 208,
//     attributes: {
//         titles: {
//             en_jp: 'Cardcaptor Sakura 2'
//         },
//         synopsis: 'Magical girl in a magical world 2'
//     }
// }]}];
// // beforeEach(function() {
// //   window.fetch = jest.fn().mockImplementation(() => Promise.resolve(fakeAnimes));
// // });
// beforeEach(() => {
//   nock('*')
//       .get('/api/v1/animes')
//       .reply(200, fakeAnimes)
// });

// it("renders the animes", async () => {
    
//       jest.spyOn(global, "fetch").mockImplementation(() =>
//         Promise.resolve({
//           json: () => Promise.resolve(fakeAnimes)
//         })
//       );
//       var authTokens='123';
//       var userId='123';
//       const wrapper = mount(<AuthContext.Provider value={{authTokens, setTokens, userId, setId}}><Animes /></AuthContext.Provider>);
//     console.log(wrapper.debug())
//     expect(wrapper.find(Anime).length).toBe(1);
//     // expect(container.hasChildNodes()).toBe(true);
//     // expect(container.textContent).toEqual(expect.stringContaining("Error! " + message));
// })

// // it("does not render if message is null", () => {
// //     act(() => {
// //         render(<Alert message={null} onClose={jest.fn()} />, container);
// //     });
// //     expect(container.hasChildNodes()).toBe(false);
// // })

// // it("sends event if button is clicked", () => {
// //     const onClose = jest.fn();
// //     act(() => {
// //         render(<Alert message="test" onClose={onClose} />, container);
// //     })

// //     const button = document.querySelector("[data-testid=close]");

// //     act(() => {
// //         button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
// //     });

// //     expect(onClose).toHaveBeenCalledTimes(1);