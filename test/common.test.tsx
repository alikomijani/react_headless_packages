import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { LoadingButton } from '../src'

describe('Common render', () => {
  const onClick = () => {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
  it('renders without crashing', () => {
    render(<LoadingButton progressProps={{}} loadingText='loading...' onClick={onClick} />)
  })
})
