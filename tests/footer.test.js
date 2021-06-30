/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ pathname: '/' }));

import Footer from '../components/Footer/Footer'

it('renders nav bar logo', () => {
    const { getByText } = render(<Footer />)
    const linkElement = getByText(
        /Home/
    )
    expect(linkElement).toBeInTheDocument()
})