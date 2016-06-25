import React, { PropTypes } from 'react'
import PageLayout from 'layouts/PageLayout'
import SiteMenu from '../containers/SiteMenuContainer'
import NotFound from 'containers/NotFound'

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
    <PageLayout>
      {Component}
    </PageLayout>
  )
}

SiteView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  sites: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}

export default SiteView
