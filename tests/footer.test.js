/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ pathname: '/' }));

import Footer from '../components/Footer/Footer'

describe('Footer', () => {
    it('Should render home link', () => {
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