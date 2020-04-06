import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Card from './Card'

describe('<Card />', () => {
  it('card trigger with index', () => {
    const onClick = sinon.spy()
    const wrapper = shallow(
      <Card
        card="🎉"
        feedback="visible"
        index={1}
        onClick = {onClick}
      />)
    wrapper.simulate('click')
    expect(onClick).to.have.been.calledWith(1)
  })

  it('should match its reference snapshot', () => {
    const onClick = sinon.spy()
    const wrapper = shallow(
      <Card card="😁" feedback="hidden" index={0} onClick={onClick} />
    )

    expect(wrapper).to.matchSnapshot()
  })
})
