import React from 'react'
import NotFound from 'components/NotFound'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}

export const NotFoundView = (props) => (
  <div style={styles.root} >
    <NotFound />
  </div>
)

NotFoundView.propTypes = {}

export default NotFoundView
