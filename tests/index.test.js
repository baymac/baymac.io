/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import Home from '../pages/index'

test('renders deploy link', () => {
  const { getByText } = render(<Home />)
  const linkElement = getByText(
    /Hey, I am Parichay/
  )
  expect(linkElement).toBeInTheDocument()
})