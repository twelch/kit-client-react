import React from 'react'
import HeaderContainer from '../../containers/HeaderContainer'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <HeaderContainer />
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
