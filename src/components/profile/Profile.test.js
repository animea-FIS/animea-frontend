import React from 'react';
import Profile from './Profile';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import { isExportDeclaration } from 'typescript';

let container = document.createElement("div");
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

it("renders the profile", () => {
    const message = "Hola";
    act(() => {
    
    });
    expect(container.hasChildNodes()).toBe(true);
    expect(container.textContent).toEqual(expect.stringContaining("Hola"));
})

it("does not render if message is null", () => {
    act(() => {
        
    })
})