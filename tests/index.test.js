/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ pathname: '/' }));

import Nav from '../components/Nav/Nav'

it('renders nav bar logo', () => {
  const { getByText } = render(<Nav />)
  const linkElement = getByText(
    /PB/
  )
  expect(linkElement).toBeInTheDocument()
})