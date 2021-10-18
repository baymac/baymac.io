/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { useRouter } from "next/router";


jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}))

import Footer from '../components/Footer/Footer'

describe('Footer', () => {

    const push = jest.fn();

    useRouter.mockImplementation(() => ({
        push,
        pathname: "/",
        route: "/",
        asPath: "/",
        query: "",
    }));

    it('Should render home link', () => {
        const mockRouter = {
            push: jest.fn() // the component uses `router.push` only
        };
        (useRouter).mockReturnValue(mockRouter);

        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal-root')
        document.body.appendChild(modalRoot)
        render(<Footer />)
        const linkElement = screen.getByText(
            /Home/
        )
        expect(linkElement).toBeInTheDocument()
    })
})