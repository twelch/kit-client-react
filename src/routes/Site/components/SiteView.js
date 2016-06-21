import React, { PropTypes } from 'react'
import SiteMenu from '../containers/SiteMenuContainer'
import NotFound from 'components/NotFound'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  header: {
    fontSize: '1.75rem',
    fontFamily: 'Roboto, sans-serif',
    margin: '1rem 0 2rem 0'
  }
}

const SiteView = (props, context) => {
  const {sites, params} = props
  const siteid = params.siteid

  let Component = null
  if (!siteid || !sites.hasOwnProperty(siteid)) {
    Component = <NotFound />
  } else {
    Component = <SiteMenu {...props} />
  }

  return (
    <div style={styles.root} >
      {Component}
    </div>
  )
}

SiteView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  sites: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}

export default SiteView
