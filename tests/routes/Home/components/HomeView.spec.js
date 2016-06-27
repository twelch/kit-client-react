import React from 'react'
import TestUtils from 'react-addons-test-utils'
import HomeView from 'routes/Home/components/HomeView'
import { shallow } from 'enzyme'
import LoginForm from 'forms/LoginForm/LoginContainer'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<HomeView {...props} />)
}

describe('(View) Home', () => {
  beforeEach(() => {
    
  })

  it('Renders LoginForm when unauthenticated', () => {
    let component
    let props = {
      isAuthenticated: false,
      dispatch: () => {}
    }

    component = shallow(
      <HomeView {...props} />
    )

    expect(component.find(LoginForm)).to.have.lengthOf(1)
  })

  

})
